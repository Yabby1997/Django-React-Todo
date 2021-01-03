import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,             //modal 여부
      viewCompleted: false,
      activeItem: {             //선택된 item 정보
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }

  componentDidMount(){
    this.refreshList();
  }

  refreshList(){
    axios.get("http://localhost:8000/api/todos/")
    .then(res => this.setState({ todoList: res.data}))
    .catch(err => console.log(err));
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if(item.id){
      axios.put('http://localhost:8000/api/todos/${item.id}/', item)
      .then(res => this.refreshList());
      alert("Edited!");
      return;
    }
    axios.post('http://localhost:8000/api/todos/', item)
    .then(res => this.refreshList());
    alert("Created!");
  };

  handleDelete = item => {
    axios.delete('http://localhost:8000/api/todos/${item.id}')
    .then(res => this.refreshList());
    alert("Deleted!");
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    })
  };

  editItem = item => {
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    })
  };

  //인자로받는 status에 따라 this.state의 viewCompleted를 변화시키는 함수
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  //complete 리스트를 볼지 incomplete 리스트를 볼지를 선택하는 부분
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
            </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    //보여줄 item인 newItems는 item을 todoList의 아이템의 completed여부와 viewCompleted가 동일한것만 보여준다.
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    //보여줄 item들을 모두 list로 만들어 반환 
    return newItems.map(item => (
      <li
        key={item.id} //key는 필수
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          onClick={() => this.editItem(item)}
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >{item.title}</span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          > Edit </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >Delete </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button
                  onClick={this.createItem}
                  className="btn btn-primary"
                >Add task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          ></Modal>
        ) : null}
      </main>
    );
  }
}
export default App;