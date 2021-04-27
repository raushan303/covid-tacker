import { stateCode } from '../../Data/index';

const Index = (covidData, searchString) => {
  let searchData = [];
  console.log(covidData);
  stateCode.map((row) => {
    if (covidData[row.code]) {
      if (row.name.toUpperCase().match(searchString.toUpperCase())) {
        searchData.push(row);
      }
    }
  });
  return searchData;
};

export default Index;
