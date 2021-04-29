import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Wrapper } from './style';
import { Select, message } from 'antd';

import { getCovidData } from '../../redux/action';
import { stateCode } from '../../Data/index';
import SearchFunction from '../searchingFunction';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

let setTimeOutRef;

function Index({ getCovidData, getCovidDataRes }) {
  const [covidData, setCovidData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getCovidData();
  }, []);

  useEffect(() => {
    if (getCovidDataRes.response) {
      if (getCovidDataRes.error) message.error('Some error occured refresh the page again!');
      else {
        setCovidData(getCovidDataRes.data.data);
        console.log(getCovidDataRes.data.data);
      }
    }
  }, [getCovidDataRes]);

  const onSearch = (val) => {
    console.log(val);
    if (!setTimeOutRef) {
      clearTimeout(setTimeOutRef);
    }
    setTimeOutRef = setTimeout(() => {
      setSearchData(SearchFunction(covidData, val));
    }, 1000);
  };

  const handleSelectChange = (val, child) => {
    history.push(`/state/${child.props.code}`);
  };

  return (
    <Wrapper>
      <h1>COVID TRACKER</h1>
      <div className='select-box-container'>
        <Select showSearch onSearch={onSearch} onChange={handleSelectChange}>
          {searchData.map((stateObj) => (
            <Option key={stateObj.code} code={stateObj.code} value={stateObj.name}>
              {stateObj.name}
            </Option>
          ))}
        </Select>
      </div>
      <h1 className='country-name'>INDIA</h1>
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
          {stateCode.map((row, index) => {
            if (covidData[row.code])
              return (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{covidData[row.code].total.confirmed}</td>
                  <td>{covidData[row.code].total.tested}</td>
                  <td>{covidData[row.code].total.recovered}</td>
                  <td>{covidData[row.code].total.deceased}</td>
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
