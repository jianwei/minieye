
import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import urlConfig from '../../../config/urlConfig';
import { Link, connect } from 'umi';

const TreeGroup = (props) => {

    const { dispatch } = props;
    const [checkedKeys, setCheckedKeys] = useState([props.selected]);


    useEffect(() => {
        dispatch({
            type: 'organization/fetchOrganization',
            payload: {
                count: 5,
            },
        });
    }, []);


    const onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        setCheckedKeys(checkedKeys);
        dispatch({
            type: 'organization/selectedReducer',
            payload: {
                selected: checkedKeys,
            },
        });
    };

    return (
        <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={formmatData(props.group)}
        />
    );
};

const formmatData = (treeData) => {
    for (let i = 0; i < treeData.length; i++) {
        let item = treeData[i];
        item.key = item.id;
        item.title = item.text;
        if (item.children.length > 0) {
            formmatData(item.children);
        }
    }
    return treeData;
}

export default connect(({ organization }) => ({
    group: organization.group,
    selected: organization.selected
}))(TreeGroup);