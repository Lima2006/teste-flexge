import { Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompaniesRequest } from "../../company/state/company-slice";

const CompanySelect = (props) => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.companies);

  React.useEffect(() => {
    dispatch(
      fetchCompaniesRequest({
        page: 1,
        pageSize: 100,
      })
    );
  }, [dispatch]);

  return (
    <Select {...props}>
      {companies?.map(({ _id, name }) => (
        <Select.Option key={_id} value={_id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CompanySelect;
