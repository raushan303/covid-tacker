import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Wrapper } from '../countryCovidStatus/style';
import { Select, message } from 'antd';

import { getCovidData } from '../../redux/action';
import { stateCode } from '../../Data/index';
import SearchFunction from '../searchingFunction';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

let setTimeOutRef;

function Index({ getCovidData, getCovidDataRes, match }) {
  const [covidData, setCovidData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const history = useHistory();

  const code = match.params.stateCode;

  useEffect(() => {
    getCovidData();
  }, []);

  const getDistrictData = (code) => {
    const allKeys = Object.keys(getCovidDataRes.data.data[code].districts);
    const districtData = allKeys.map((district) => ({
      ...getCovidDataRes.data.data[code].districts[district],
      name: district,
    }));
    setCovidData(districtData);
  };

  useEffect(() => {
    if (getCovidDataRes.response) {
      if (getCovidDataRes.error) message.error('Some error occured refresh the page again!');
      else {
        const allKeys = Object.keys(getCovidDataRes.data.data[code].districts);
        const districtData = allKeys.map((district) => ({
          ...getCovidDataRes.data.data[code].districts[district],
          name: district,
        }));
        setCovidData(districtData);
      }
    }
  }, [getCovidDataRes]);

  const onSearch = (val) => {
    console.log(val);
    if (!setTimeOutRef) {
      clearTimeout(setTimeOutRef);
    }
    setTimeOutRef = setTimeout(() => {
      setSearchData(SearchFunction(getCovidDataRes.data.data, val));
    }, 1000);
  };

  const handleSelectChange = (val, child) => {
    history.push(`/state/${val}`);
    getDistrictData(val);
  };

  return (
    <Wrapper>
      <h1>COVID TRACKER</h1>
      <div className='select-box-container'>
        <Select showSearch onSearch={onSearch} onChange={handleSelectChange}>
          {searchData.map((stateObj) => (
            <Option key={stateObj.code} value={stateObj.code}>{stateObj.name}</Option>
          ))}
        </Select>
      </div>
      <h1 className='country-name'>
        {stateCode.map((stateObj) => {
          if (stateObj.code === code) return stateObj.name;
        })}
      </h1>
      <table border='1' frame='void' rules='rows'>
        <thead>
          <tr>
            <th>State</th>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Deceased</th>
          </tr>
        </thead>
        <tbody>
          {covidData.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.total.confirmed}</td>
                <td>{row.total.tested}</td>
                <td>{row.total.recovered}</td>
                <td>{row.total.deceased}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    getCovidDataRes: state,
  };
}

export default connect(mapStateToProps, {
  getCovidData,
})(Index);
