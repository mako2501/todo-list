import React, { useState } from 'react';

/*komponent Todo*/

const Todo = () => {

  //dwie listy przechwoujace moje zadania do wykonania - aktualne i wykonane - sa w useState
  const [todos, setTodos] = useState([]); //puste listy na poczatek
  const [completedTodos, setCompletedTodos] = useState([]);

  //ogarnij dodawanie do listy, dane z inputa text
  const handleAddTodo = () => {
    const input = document.getElementById('input-add-todo');
    if (input.value.trim() !== '') { // i cos jest wpisane
      const newTodo = { // nowe zadanie
        id: Math.random(), // do key
        text: input.value.trim(),
        completed: false // zadanie 'do zrobienia'
      };
      setTodos([...todos, newTodo]); //dodaje do useStata
      input.value = ''; // wyczysc inputa
    }
  };

  // przelacza zadanie z do wykonania na wykonane 
  const doTodo = (id) => { 
    const newTodos = todos.map(todo => { //mapuje po todos po id
      if (todo.id === id) { 
        return { ...todo, completed: true }; // kopiuje wszystkie istniejace własciwosci znalezionego zadania - !completed da
      }
      return todo;
    });
    setTodos(newTodos); // aktualizuje liste tudosow

    const completedTodo = newTodos.find(todo => todo.id === id && todo.completed); // szukam wykonanego zadania z todos
    if (completedTodo) {
      setCompletedTodos([completedTodo,...completedTodos]); // aktualizuje liste wykonanych w odwrotnej kolejnosci aby ostatnio wykonane byly na gorze
      setTodos(newTodos.filter(todo => !todo.completed)); // !completed da true bo zadania niewykonane maja false
    } 
  };

  return (
    <div className="mt-3">
      <h2>Do zrobienia ({todos.length || 'Brak zadań'})</h2> 
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control input-add-todo"
          id="input-add-todo"
          placeholder="Dodaj zadanie"
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()} // gdy enter i && zamiast ifa o ktorym byla mowa, generalnie handleAddTodo sie nei wykona jesli lewa strona bedzie false
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleAddTodo}>Dodaj</button>
        </div>
      </div>
      <ul className="list-group mb-3"> 
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => doTodo(todo.id)}
              className="mr-2"
            />
            {todo.text}
          </li>
        ))}
      </ul>
      {<h2>Zadania wykonane ({completedTodos.length || 'Jeszcze nic nie zrobiłeś'})</h2>/*z lewej jest truthy gdy >0 to zwroci liczbe, gdy =0 bardzie truthy bedzie prawe */} 
      <ul className="list-group">
        {completedTodos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input
              type="checkbox"
              checked={true}
              //onChange={/* nic tu nie robie, chce aby zrealizowane zadania zostaly na dolnej liscie */} 
              disabled={true} 
              className="mr-2"
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
