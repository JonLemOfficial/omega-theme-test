"use strict";

import React, { Component } from 'react';
import { Layout, Page, Card, DataTable, Link } from '@shopify/polaris';
import axios from 'axios';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentWillMount() {
    let rows;
    axios
      .get("/users")
      .then(({ data }) => {
          rows = data.map(user => [
            user.id,
            user.name,
            user.phone,
            user.email,
            <Link url={`https://www.google.com/maps/search/${user.address}/`} external>{user.address}</Link>
          ]);
        this.setState({
          rows
        });
      })
      .catch((error) => {

      });
  }

  render() {
    
    const primaryAction = { content: 'Add new user', url: "/" };
    
    return (
      <>
        <Page
          title="Users list"
          primaryAction={primaryAction}>
          <Layout>
            <Layout.Section
              title="Registered users"
              description="all registered users with their locations">
              <Card sectioned>
                {
                  this.state.rows.length > 0 ? (
                    <DataTable
                      columnContentTypes={[
                        'numeric',
                        'text',
                        'text',
                        'text',
                        'text'
                      ]}
                      headings={[
                        'ID',
                        'Name',
                        'Phone',
                        'Email',
                        'Address',
                      ]}
                      rows={this.state.rows}/>
                  ) : (
                    <h2>No registered users yet</h2>
                  )
                }
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </>
    );
  }
}

export default UserList;