import React, { useState } from 'react';
import { PlusOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Tag, Input, Space, Tooltip, Modal, Row, Col, Form } from 'antd';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import urlConfig from '../../../config/urlConfig';
import TreeGroup from '../common/TreeGroup';
import { Link, connect } from 'umi';

const busManager = (props) => {

    const column = [
        {
            title: '车牌号',
            dataIndex: 'plateNo',
            fixed: 'left',
            width: 60
        },
        {
            title: '颜色',
            dataIndex: 'plateColor',
            hideInSearch: true,
            width: 20
        },
        {
            title: '终端卡号',
            dataIndex: 'simNo',
            width: 60
        },
        {
            title: '驾驶员',
            dataIndex: 'plateNo3',
            width: 50
        },
        {
            title: '运营状态',
            dataIndex: 'runStatus',
            // filters: true,
            valueEnum: {
                Normal: '正常',
                Maintain: '整修',
                Stop: '停运',
                Abort: '报废',
            },
            width: 50
        },
        {
            title: '车组',
            dataIndex: 'depName1',
            width: 50,
            renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
                // console.log('item:', _);
                // console.log('config:', { type, defaultRender, ...rest });
                // console.log('form:', form);
                if (type === 'form') {
                    return null;
                }
                const status = form.getFieldValue('state');
                if (status !== 'open') {
                    return (
                        <>
                            <Input onClick={() => { searchGroup() }} placeholder="点击选择车组信息" />
                        </>);
                }
                return defaultRender(_);
            }
        },
        {
            title: '车辆类型',
            dataIndex: 'plateNo4',
            hideInSearch: true,
            width: 70
        },
        {
            title: '行业',
            dataIndex: 'industryTypeName',
            hideInSearch: true,
            width: 90
        },
        {
            title: '车籍地',
            dataIndex: 'plateNo1',
            hideInSearch: true,
            width: 80
        },
        {
            title: '备注',
            hideInSearch: true,
            dataIndex: 'plateNo2',
            width: 60,
        },
        {
            title: '操作',
            hideInSearch: true,
            dataIndex: 'simNo',
            width: 40,
            fixed: 'right',
            render: () => (
                <>
                    <Space size="large">
                        <Tooltip title="编辑" onClick={() => { openModal(2) }}><EditOutlined /></Tooltip>
                        <Tooltip title="删除"><CloseCircleOutlined /></Tooltip>
                    </Space>
                </>
            )
        }
    ]
    // new
    const [modalStatus, setmodalStatus] = useState(false);
    const [modalTitle, setmodalTitle] = useState('添加车辆');
    //search Group
    const [modalSearch, setmodalSearch] = useState(false);


    const searchGroup = () => {
        // console.log("searchGroup")
        setmodalSearch(true);
    }
    const openModal = (flag) => {
        flag == 1 ? setmodalTitle("添加车辆") : setmodalTitle("编辑车辆")
        setmodalStatus(true);
    }

    return <>
        <ProTable
            columns={column}
            request={async (params) =>
                request(urlConfig.host + urlConfig.path.bus_list, {
                    params,
                })
            }
            scroll={{ x: 1500 }}
            rowKey="id"
            // manualRequest={true}
            dateFormatter="string"
            headerTitle="车辆信息管理"
            toolBarRender={() => [
                <Button key="3" type="primary" onClick={() => { openModal(1) }}>
                    <PlusOutlined />添加车辆
                </Button>,
            ]}
        />


        <Modal
            width={800}
            title={modalTitle}
            visible={modalStatus}
            //   onOk={this.handleOk}
            onCancel={() => { setmodalStatus(false) }}
        >
            {modalConeten()}
        </Modal>



        <Modal
            title={"选择车组"}
            visible={modalSearch}
            //   onOk={this.handleOk}
            onCancel={() => { setmodalSearch(false) }}
        >
            <TreeGroup></TreeGroup>
        </Modal>

    </>
}

const left = 10;
const right = 14;
const { TextArea } = Input;

const modalConeten = () => (
    <>
        <Form layout="Inline" labelCol={{ span: left }} wrapperCol={{ span: right }}>
            <Row>
                <Col span={left}>
                    <Form.Item label="车牌号码">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="车牌颜色">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={left}>
                    <Form.Item label="所属业户">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="车辆组">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={left}>
                    <Form.Item label="行业类型">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="终端卡号">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={left}>
                    <Form.Item label="车籍地">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="绑定终端">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={left}>
                    <Form.Item label="唯一终端ID">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="终端类型">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={left}>
                    <Form.Item label="设备当前状态">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="安装时间">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>





            <Row>
                <Col span={left}>
                    <Form.Item label="视屏通道数目">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="存储器">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={left}>
                    <Form.Item label="主司机姓名">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="押运员姓名">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>


            <Row>
                <Col span={left}>
                    <Form.Item label="司机联系电话">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="运行状态">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={left}>
                    <Form.Item label="车辆类型">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>
                    <Form.Item label="发动机号">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Col>
            </Row>


            <Row>
                <Col span={left}>
                    <Form.Item label="备注">
                        <TextArea placeholder="input placeholder" />
                    </Form.Item>
                </Col>
                <Col span={right}>

                </Col>
            </Row>
        </Form>
    </>
)

// export default busManager
export default connect(({ organization }) => ({
    group: organization.group,
    selected: organization.selected
}))(busManager);