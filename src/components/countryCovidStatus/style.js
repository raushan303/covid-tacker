import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 80px;

  .select-box-container {
    padding: 30px 0;
    .ant-select {
      width: 250px;
      .ant-select-selector {
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: center;
      }
    }
  }

  .country-name {
    display: flex;
    margin-bottom: 50px;
  }

  table {
    border: 1px solid #dddddd;
    padding: 10px;
    width: 100%;
  }
  tr {
    border-bottom: 1px solid #dddddd;
    text-align: left;
  }
  th {
    width: 20%;
    font-weight: 500;
    padding: 25px 0 25px 20px;
  }
  td {
    padding: 10px 0px 10px 20px;
  }
`;
