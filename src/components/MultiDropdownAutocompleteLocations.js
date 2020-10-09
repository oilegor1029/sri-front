import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import environment from '../createRelayEnvironment';
import { fetchQuery } from 'relay-runtime';

import MultiDropdownAutocomplete from './MultiDropdownAutocomplete';

const PRE_FILTERS = {
  // main: {
  //   name: 'Show All',
  //   fieldId: 'showall',
  //   filterProperty: {},
  // },
  subTypes: [
    {
      name: 'Show Racks',
      fieldId: 'racks',
      filterProperty: {},
    },
    {
      name: 'Show Rooms',
      fieldId: 'rooms',
      checked: true,
      filterProperty: {},
    },
    {
      name: 'Show Sites',
      fieldId: 'sites',
      filterProperty: {},
    },
  ],
};

const MultiDropdownAutocompleteLocationsRacksQuery = graphql`
  query MultiDropdownAutocompleteLocationsRacksQuery($count: Int!, $filter: RackFilter) {
    racks(first: $count, filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const MultiDropdownAutocompleteLocationsRoomsQuery = graphql`
  query MultiDropdownAutocompleteLocationsRoomsQuery($count: Int!, $filter: RoomFilter) {
    rooms(first: $count, filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const MultiDropdownAutocompleteLocationsSitesQuery = graphql`
  query MultiDropdownAutocompleteLocationsSitesQuery($count: Int!, $filter: SiteFilter) {
    sites(first: $count, filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

async function getLocations(preFilterEntity, textFilter = '') {
  console.log('textFilter: ', textFilter);
  console.log('preFilterEntity: ', preFilterEntity);
  const queries = {
    racks: MultiDropdownAutocompleteLocationsRacksQuery,
    rooms: MultiDropdownAutocompleteLocationsRoomsQuery,
    sites: MultiDropdownAutocompleteLocationsSitesQuery,
  };
  const data = await fetchQuery(environment, queries[preFilterEntity], {
    count: 3,
    filter: { OR: [{ name_contains: textFilter }] },
  });
  return data;
}

const MultiDropdownAutocompleteLocations = ({ onSelectOption, optionsPreSelected }) => {
  const [preFilter, changePreFilter] = useState('racks');
  const [textFilter, changeTextFilter] = useState('');
  const [filteredData, changeFilteredData] = useState({ data: {} });
  return (
    <div>
      <MultiDropdownAutocomplete
        entityFilters={PRE_FILTERS}
        locationsData={filteredData}
        isMultiSelect={true}
        optionsPreSelected={optionsPreSelected}
        isActive={async () => {
          if (!filteredData.data[preFilter]) {
            const data = await getLocations(preFilter, textFilter);
            changeFilteredData({ data });
          }
        }}
        changePreFilter={async (newPreFilter) => {
          const data = await getLocations(newPreFilter, textFilter);
          changePreFilter(newPreFilter);
          changeFilteredData({ data });
        }}
        changeText={async (text) => {
          const data = await getLocations(preFilter, text);
          changeTextFilter(text);
          changeFilteredData({ data });
        }}
        onSelectOption={onSelectOption}
      />
    </div>
  );
};

export default MultiDropdownAutocompleteLocations;
