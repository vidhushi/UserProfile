import React from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';

class UserListTable extends React.Component{
    render(){
        var dataColumns = ['Avatar', 'First Name', 'Last Name', 'Email', ];
        var dataRows = this.props.users;
        var fields = ['avatar', 'first_name','last_name', 'email', ];
    
        var tableHeaders = (<thead>
              <tr>
                {dataColumns.map(function(column, index) {
                  return <th key={index}>{column}</th>; })}
              </tr>
          </thead>);
    
        var tableBody = dataRows.map(function(row) {
          return (
            <tr key={row['id']}>
              {fields.map(function(column, index) {
                if(column==='avatar'){
                  return <td key={index}><img className='avatar' src = {row[column]} alt='avatar' /></td>;
                }
                else{
                  return <td key={index}>{row[column]}</td>;
                }
              })}
            </tr>); });
         
        // Decorate with Bootstrap CSS
        return (<table className="table table-bordered table-hover" width="80%">
            {tableHeaders}
            <tbody>{tableBody}</tbody>
          </table>) }
}


class App extends React.Component {
  apiBaseURL = `https://reqres.in/api/users`;
  state = {
    pageCount : 0,
    users : []
  }

  componentDidMount(){
    fetch(this.apiBaseURL).then(data=>data.json()).then(data=>{
      this.setState({
        pageCount : data.total_pages
      },()=>{
        if(this.state.pageCount>0){
          this.loadUsersFromServer(1);
        }
      })
    })
  }

  loadUsersFromServer(pageNumber){
    fetch(`${this.apiBaseURL}?page=${pageNumber}`).then(data=>data.json()).then(response=>{
      this.setState({
        users : response.data
      })
    })
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    // selected is the index value, which starts with 0. to get the page number we will add 1 to this.
    const pageNumber = selected+1;
    this.loadUsersFromServer(pageNumber)
  };

  render(){
    if(this.state.pageCount>0){
      return (
        <div className="App">
          <UserListTable users = {this.state.users}></UserListTable> 
          <ReactPaginate
            breakLabel={'...'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            activeClassName={'active'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            
          />
        </div>);
    }
    else{
      return(<div>Loading</div>)
    }
  }
  
}

export default App;
