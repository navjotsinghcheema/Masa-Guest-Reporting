import React from 'react';
import renderer from 'react-test-renderer';
import Guests from '../data/guests';
import App from './App';

test('App snapshot test', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("guests.json sanity tests", () => {
    test("Row count matches # of elements in data array", () => {           
      const numGuests = Guests["meta-data"]["row_count"];
      expect(Guests.data.length).toBe(numGuests);
    });
  
    test("Number of elements in data array are greater than 0", () => {
      expect(Guests.data.length).toBeGreaterThan(0);
    });
  
    // To ensure the data recieved is of the same format as meta-data payloadx
    test("Test data types of elements with first element", () => {
      const firstElementKeys = Object.keys(Guests.data[0]);
      const metadataElementKeys = Guests["meta-data"]["payload"].map(item => item.id);
      expect(firstElementKeys).toContain(...metadataElementKeys)
    })

    test("Data must contain a value for total spend and visit count as a positive number for each user", () => {
      Guests.data.map(guest => {
        expect(guest.visit_count).toBeGreaterThanOrEqual(0);
        expect(guest.total_spend).toBeGreaterThanOrEqual(0);
      })
    })
  })