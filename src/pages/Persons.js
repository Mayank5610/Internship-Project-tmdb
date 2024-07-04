import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_LIST_PERSONS } from "../graphql/Queries";
import {
  Button,
  Descriptions,
  Divider,
  Input,
  Modal,
  Pagination,
  Space,
  Spin,
  Table,
  notification,
} from "antd";
import { DELETE_PERSON } from "../graphql/Mutations";
import { useNavigate } from "react-router-dom";

const Persons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletePerson, setDeletePerson] = useState("");

  const navigate = useNavigate();

  const { loading, error, data, fetchMore } = useQuery(GET_LIST_PERSONS, {
    fetchPolicy: "cache-and-network",
    variables: {
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
      field: "name",
      order: sortOrder,
    },
  });

  const [deletePersonData] = useMutation(DELETE_PERSON, {
    variables: { id: deletePerson },
    onCompleted: () => {
      notification.success({
        message: "Person Deletion Completed!",
        description: "Person Data Deleted!",
      });
      fetchMore({
        variables: {
          limit: pageSize,
          skip: (currentPage - 1) * pageSize,
          field: "name",
          order: sortOrder,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          return fetchMoreResult;
        },
      });
    },

    onError: () => {
      notification.error({
        message: "Error Occured!",
        description: `${error.message}`,
      });
    },
  });

  if (loading && !data)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (error)
    return notification.error({
      message: "Error Occured!",
      description: `${error.message}`,
    });

  const { listPersons } = data;

  //   console.log(listPersons);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text) => text || "Unknown",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => text || "Unknown",
    },
    {
      title: "Biography",
      dataIndex: "biography",
      key: "biography",
      render: (text) => text || "Unknown",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => text || "Unknown",
    },
    {
      title: "Adult",
      dataIndex: "adult",
      key: "adult",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewModal(record)}>
            View
          </Button>
          <Button onClick={() => handleEditClick(record.id)}>Edit</Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteModalVisible(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = () => {
    const newSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(newSortOrder);

    fetchMore({
      variables: {
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
        field: "name",
        order: sortOrder,
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddPerson = () => {
    navigate(`/persons-list/create`);
  };

  const handleViewModal = (record) => {
    console.log(record);
    setSelectedPerson(record);
    setViewModalVisible(true);
  };

  const handleViewModalClose = () => {
    setViewModalVisible(false);
  };

  const handleEditClick = (personId) => {
    navigate(`/persons-list/${personId}/edit`);
  };

  const handleDeleteModalVisible = (id) => {
    setDeletePerson(id);
    setDeleteModalVisible(true);
    console.log("deletePerson ", deletePerson);
  };

  const handleDelete = () => {
    deletePersonData();
    setDeleteModalVisible(false);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalVisible(false);
  };

  const filteredData = listPersons.data.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Divider>Persons List</Divider>
      <Input
        style={{ marginBottom: "10px", width: "200px" }}
        value={searchText}
        placeholder="Search By Name"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        style={{ marginLeft: "10px" }}
        type="primary"
        onClick={handleAddPerson}
      >
        Add New Person
      </Button>
      <Table
        dataSource={
          filteredData.map((person) => ({ ...person, key: person.id })) || []
        }
        columns={columns}
        rowKey="id"
        pagination={false}
        onChange={handleTableChange}
      />
      <Pagination
        current={currentPage}
        style={{ marginTop: "1rem", padding: "10px", textAlign: "center" }}
        total={listPersons.count}
        showSizeChanger={false}
        onChange={handlePageChange}
      />

      <Modal
        title="Person Details"
        open={viewModalVisible}
        onCancel={handleViewModalClose}
        footer={[
          <Button type="primary" key="close" onClick={handleViewModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedPerson && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedPerson.name || "Unknown"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {selectedPerson.gender || "Unknown"}
            </Descriptions.Item>
            <Descriptions.Item label="Adult">
              {selectedPerson.adult ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Biography">
              {selectedPerson.biography || "Unknown"}
            </Descriptions.Item>
            <Descriptions.Item label="Birthday">
              {selectedPerson.birthday || "Unknown"}
            </Descriptions.Item>
            <Descriptions.Item label="Place of Birth">
              {selectedPerson.placeOfBirth || "Unknown"}
            </Descriptions.Item>
            <Descriptions.Item label="Also Known As">
              {selectedPerson.alsoKnownAs || "Unknown"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onCancel={handleDeleteModalClose}
        footer={[
          <Space>
            <Button type="primary" key="delete" danger onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleDeleteModalClose}>Cancel</Button>
          </Space>,
        ]}
      >
        Are you sure you want to delete the person with id {deletePerson}
      </Modal>
    </>
  );
};

export default Persons;
