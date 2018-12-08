import React, { Component } from 'react';
import employeeRequest from '../DBRequests/employee';
import { EmployeeDepartmentList } from './EmployeeDepartmentList'; 
import { EmployeeTypeList } from './EmployeeTypeList';
import { EmployeeComputerList } from './EmployeeComputerList';
import computerRequest from '../DBRequests/computer';

export class EmployeeAdd extends Component {
  state = {
    newEmployee:{
      firstName: '',
      lastName: '',
      departmentId: '',
      employeeTypeId: '',
      assignedComputer: ''
    },
    computers: []
  };

  firstNameChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.firstName = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  };

  lastNameChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.lastName = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  departmentIdChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.departmentId = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  employeeTypeIdChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.employeeTypeId = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  assignedComputerChange = (e) => {
    const tempNewEmployee = { ...this.state.newEmployee };
    tempNewEmployee.assignedComputer = e.target.value;
    this.setState({ newEmployee: tempNewEmployee });
  }

  getComputers = () => {
    computerRequest.GetAllAvailableAndOperableComputers()
    .then((computers) => {
      this.setState({computers});
    })
    .catch((err) => {
      console.error('Error adding an employee types: ', err);
    })
  };

  addEmployee = () => {
    employeeRequest.addEmployee(this.state.newEmployee)
    .then((res) => {
      this.props.updateState();
      // reset computers drop-down to 'Choose Here'
      this.getComputers();
    })
    .catch((err) => {
      console.error('Error adding an employee: ', err);
    });
  };

  updateComputers = (computers) => {
    this.setState({computers});
  };

  render() {
    return (
      <tr>
        <td>
          <input 
            onChange={this.firstNameChange} 
            value={this.state.newEmployee.firstName}
            placeholder="First Name"
          />
        </td>
        <td>
          <input 
            onChange={this.lastNameChange} 
            value={this.state.newEmployee.lastName}
            placeholder="Last Name"
          />
        </td>
        <td>
          <EmployeeDepartmentList 
            departmentIdChange={this.departmentIdChange}
          />
        </td>
        <td>
          <EmployeeTypeList 
            employeeTypeIdChange={this.employeeTypeIdChange}
          />
        </td>
        <td>
          <EmployeeComputerList 
            assignedComputerChange={this.assignedComputerChange}
            updateComputers={this.updateComputers}
            computers={this.state.computers}
          />
        </td>
        <td><button onClick={this.addEmployee}>Add</button></td>
      </tr>
    );
  }
}