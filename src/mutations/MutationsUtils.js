import i18n from '../i18n';
import { CREATE, UNLINK, REMOVE, SAVED } from '../utils/constants';
import { camelize } from '../utils';

export function generatePortForInput(portList) {
  const toCreate = portList
    ? portList.filter((port) => port.status === CREATE).map((e) => ({ name: e.name, port_type: e.type.value }))
    : [];

  const toSaved = portList
    ? portList.filter((port) => port.status === SAVED).map((e) => ({ id: e.id, name: e.name }))
    : [];

  const toUnlink = portList
    ? portList.filter((port) => port.status === UNLINK).map((e) => ({ relation_id: e.relation_id }))
    : [];

  const toRemove = portList ? portList.filter((port) => port.status === REMOVE).map((e) => ({ id: e.id })) : [];
  return {
    toCreate,
    toSaved,
    toUnlink,
    toRemove,
  };
}

export function generateSubInputs(subInputObject, typeFieldName, specificFieldName = null) {
  const result = {
    toUpdate: [],
    toUnlink: [],
    toDelete: [],
  };

  if (subInputObject) {
    result.toUpdate = subInputObject
      .filter((element) => element.status === SAVED)
      .map((element) => {
        const resultElement = {
          id: element.id,
          name: element.name,
        };
        if (element.description) {
          resultElement.description = element.description;
        }
        if (typeFieldName && element.type) {
          resultElement[typeFieldName] = element.type.value;
        }
        if (specificFieldName && element[specificFieldName]) {
          resultElement[specificFieldName] = element[specificFieldName];
        }
        return resultElement;
      });

    result.toUnlink = subInputObject
      .filter((element) => element.status === UNLINK)
      .map((element) => ({ relation_id: element.relation_id, clientMutationId: element.id }));

    result.toDelete = subInputObject
      .filter((element) => element.status === REMOVE)
      .map((element) => ({ id: element.id }));
  }
  return result;
}

export function onCompleteCompositeCreationEntity(
  form,
  response,
  entityObj,
  entityName,
  responseFieldName,
  entityNameList,
  CreateCommentMutation,
) {
  if (response[responseFieldName].created.errors) {
    form.props.notify(i18n.t('notify/generic-error'), 'error');
    return response[responseFieldName].created.errors;
  }
  const entityId = response[responseFieldName].created[camelize(entityName)].id;
  if (entityObj.comment) {
    CreateCommentMutation(entityId, entityObj.comment);
  }
  form.props.notify(i18n.t(`entity-notify-create/${entityNameList}`), 'success');
  if (form.props.history) {
    form.props.history.push(`/network/${entityNameList}/${entityId}`);
  } else {
    form.props.createdEntity(entityName, entityId);
    form.props.hideModalForm();
  }
}

export function formatExternalEquipmentVariables(data, isUpdate) {
  const FIELD_FOR_BASIC_INFO = isUpdate ? 'update_input' : 'create_input';
  const ownerToSaved = data.owner ? data.owner.find((o) => o.status === SAVED) : [];
  const ownerToRemove = data.owner ? data.owner.find((o) => o.status === REMOVE) : [];

  const ports = generatePortForInput(data.ports);

  const variables = {
    input: {
      [FIELD_FOR_BASIC_INFO]: {
        name: data.name,
        description: data.description,

        // General info
        rack_units: data.rack_units,
        rack_position: data.rack_position,
        rack_back: data.rack_back,

        // owner
        relationship_owner: ownerToSaved ? ownerToSaved.id : '', // id customer/siteOwner/provider/endUser
        relationship_location: data.location && data.location.length ? data.location[0].id : null,
      },
      // ports
      update_has_port: ports.toSaved,
      unlink_subinputs: ports.toUnlink,
      deleted_has_port: ports.toRemove,
      create_has_port: ports.toCreate,
    },
  };
  if (isUpdate) {
    variables.input[FIELD_FOR_BASIC_INFO].id = data.id;
  }
  if (ownerToRemove && ownerToRemove.length > 0) {
    variables.input.delete_owner = {
      id: ownerToRemove.id,
    };
  }
  return variables;
}

export default {};
