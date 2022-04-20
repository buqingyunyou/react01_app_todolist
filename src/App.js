import React from "react";
import PropTypes from "prop-types";
export default class App extends React.Component {
  // 初始化当前组件的state
  state = {
    todos: ["吃饭", "睡觉", "打牌"],
  };

  // 父组件定义方法，通过props属性传递给子组件
  addTodo = (todo) => {
    const { todos } = this.state;
    this.setState({
      todos: [todo, ...todos],
    });
  };

  render() {
    const len = this.state.todos.length;

    return (
      <div>
        <h1>使用 React组件方式实现todo添加功能</h1>
        <AddTodo len={len} addTodo={this.addTodo} />
        <ShowTodo todos={this.state.todos} />
      </div>
    );
  }
}

class AddTodo extends React.Component {
  // 对props进行类型检查
  static propTypes = {
    // PropTypes.func.isRequired (注意不是function)
    addTodo: PropTypes.func.isRequired,
    len: PropTypes.number.isRequired,
  };

  // 初始化state(用于接收input的value值)
  state = {
    todo: "",
  };

  render() {
    const { len } = this.props;
    const { todo } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="请输入任务"
          onChange={this.handleChange}
          value={todo}
        />
        <button onClick={this.addClick}>添加 #{len}</button>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value.trim(),
    });
  };
  addClick = () => {
    const { addTodo } = this.props;
    const { todo } = this.state;
    // 子组件调用通过props传递进来的addTodo函数，传入实参

    //判断是否存在数据
    if (!todo) {
      alert("请输入待办事项");
      return;
    }

    addTodo(todo);
    // 清空输入框
    this.setState({
      todo: "",
    });
  };
}

class ShowTodo extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
  };

  render() {
    // 直接将传递进来的props，拿来展示
    const { todos } = this.props;
    return (
      <ul>
        {todos.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    );
  }
}
