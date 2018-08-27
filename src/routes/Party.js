import React, { Component } from 'react'
import styled from 'react-emotion'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Loader = () => <div>Loading</div>

class SingleParty extends Component {
  render() {
    return (
      <SinglePartyContainer>
        <Query
          query={EthersQuery}
          variables={{ address: this.props.match.params.address }}
        >
          {({ data: { party }, loading }) => {
            if (loading) {
              return <Loader />
            }
            return (
              <div>
                {Object.entries(party).map(arr => (
                  <div>{`${arr[0]} ${arr[1]}`}</div>
                ))}
              </div>
            )
          }}
        </Query>
      </SinglePartyContainer>
    )
  }
}

const SinglePartyContainer = styled('div')``

const EthersQuery = gql`
  query ethers($address: String) {
    ethers @client {
      ethers
    }
    party(address: $address) @client {
      name
      deposit
      limitOfParticipants
      registered
      attended
      ended
      cancelled
      endedAt
      coolingPeriod
      payoutAmount
      encryption
      #participants: [Participant]
    }
  }
`

export default SingleParty