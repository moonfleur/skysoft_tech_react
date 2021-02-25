import React from "react";
import "./styles.css";

const API = (() => {
  return {
    search: async function() {
      return {
        data: {
          results: [
            {
              name: { first: "André", last: "Meinhard" },
              phone: "+49(0)3647 30821",
              age: "32",
              dob: { date: "11/10/89" }
            },
            {
              name: { first: "Maja", last: "Elli" },
              phone: "+49(0)0693 90065",
              age: "44",
              dob: { date: "23/07/77" }
            },
            {
              name: { first: "Irmgard", last: "Abraham" },
              phone: "+49(0)0688 38413",
              age: "16",
              dob: { date: "28/11/05" }
            },
            {
              name: { first: "Marlene", last: "Ralf" },
              phone: "+49(0)0365 64928",
              age: "27",
              dob: { date: "10/01/94" }
            },
            {
              name: { first: "Ulli", last: "Dennis" },
              phone: "+49(0)6297 035369",
              age: "23",
              dob: { date: "05/12/98" }
            }
          ]
        }
      };
    }
  };
})();

class TableMain extends React.Component {
  state = {
    originalResults: [],
    displayResults: []
  };

  componentDidMount() {
    API.search().then(results => {
      const tableData = results.data.results.map((res, i) => ({
        firstName: res.name.first,
        lastName: res.name.last,
        phone: res.phone,
        age: res.age,
        dob: res.dob.date,
        key: i
      }));

      this.setState({ originalResults: tableData, displayResults: tableData });
    });
  }

  filterResults = (query, results) => {
    return results.filter(employee => {
      const lastName = employee.lastName.toLowerCase();
      const firstName = employee.firstName.toLowerCase();
      const fullName = firstName + " " + lastName;

      return fullName.includes(query);
    });
  };

  sortResults = event => {
    this.setState(prevState => {
      const { displayResults, sortOrder } = prevState;

      if (sortOrder === "descending") {
        displayResults.sort((a, b) => {
          if (a.firstName > b.firstName) {
            return -1;
          }
          return a.firstName > b.firstName ? 1 : 0;
        });
      } else {
        displayResults.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          return a.firstName > b.firstName ? 1 : 0;
        });
      }

      return {
        displayResults,
        sortOrder: sortOrder === "descending" ? "ascending"  : "descending"
      };
    });
  };

  onChange = e => {
    const query = e.target.value;

    this.setState(prevState => ({
      displayResults:
        query.length > 0
          ? this.filterResults(query, prevState.originalResults)
          : prevState.originalResults
    }));
  };

  render() {
    return (
      <div>
        <input
          label="Search"
          onChange={this.onChange} 
          placeholder="Search" 
          className="search"
        />
        <div className="row">
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th
                  className="ascending"
                  style={{ cursor: "pointer" , fontSize: "25px" }}
                  onClick={this.sortResults}
                  id="name"
                >
                  Name
                </th>
                <th id="phone" className="params">Phone</th>
                <th id="age" className="params">Age</th>
                <th id="dob" className="params">Date of Birth</th>
              </tr>
              {this.state.displayResults.map(item => (
                <EmployeeRow
                  firstName={item.firstName}
                  lastName={item.lastName}
                  age={item.age}
                  phone={item.phone}
                  dob={item.dob}
                  key={item.key}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const EmployeeRow = ({ firstName, lastName, age, phone, dob }) => {
  return (
    <tr>
      <th>{`${firstName} ${lastName}`}</th>
      <th id="phone">{phone}</th>
      <th id="age">{age}</th>
      <th id="dob">{dob}</th>
    </tr>
  );
};

export default function App() {
  return (
    <div className="App">
      <TableMain />
    </div>
  );
}
