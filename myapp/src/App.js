// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'




function Searchbar({toggleStock}){



  return(

    <>
      <div>
        <input type='text' name='search_bar' placeholder='Search'/>
        <br/>
        <div className='heading'>
          <input type='checkbox' onChange={toggleStock}  />
          <span>Only Show Products In stock</span>
        </div>
      </div>
    
    </>

  )

}


function ProductTable({pro , setStockVal}){

  const row = [];

  let lastCategory = null;



  pro.forEach((items)=>{

    if(setStockVal && !items.stocked){
      return
    }

    if(items.category !== lastCategory){
      row.push(
        <ProductCategory category={items.category} key={items.category}/>
      );
    }

      row.push(
        <ProductRow name={items.name} item={items} key={items.name} price={items.price} status = {items.status}/>
      )
    lastCategory = items.category;
  });
  
  return(
    <>
      <div className='tab'>
        <table className='table'>
          <thead>
            <tr>
          <th className='thead'>Name</th>
          <th className='thead'>Price</th>  
          </tr>   
          </thead>
          <tbody>

            {row}

          </tbody>
        </table>
      </div>  
    </>
  )
}
function ProductRow({name, price, item}){

  const fruitname = item.stocked ? <span>{name}</span> : <span className='notStocked'>{name}</span>

  return(
    <tr>
      <td>{fruitname}</td>
      <td>{price}</td>
    </tr>
  )
}

function ProductCategory({category}){

  return(
    <>
      <tr>
        <th className='tcat'>
          {category}
        </th>
        </tr>
    </>
  )

}
function FilterdProductTable({product , next }){
  
  const [stock, setStock] = useState(false);  


  function stockChange() {
    setStock(!stock);
    console.log(stock);
  }

  return(
  <>
    <div className='Main_div'>
        <div className='Search'>
        <Searchbar toggleStock={stockChange}  />
        </div>
        <div className='table-content'>
        <ProductTable pro={product} setStockVal={stock} />
        </div>
        
    </div>    
        
  </>
  )
}

const products = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];




export default function App() {
  return (
    <>
    <Tic/>

    <FilterdProductTable   product={products}/>
    </>
  )
}





























function MYbuttons({ value, setValue }) {

  return (
    <button onClick={setValue} className='square'>
      {value}
    </button>
  )


}


function Tic() {
  const [array, nextarray] = useState(Array(9).fill(null));
  const [xIsNext, nextX] = useState(true);


  function isArrayFull(array) {
    for(let i = 0; i<array.length; i++) {
      if(array[i] == null) {
        return false;
      }
    }
    return true;
  }

  function handleClick(i) {
  

  if(array[i]) {
    return;
  }
 if(calculateWinner(array)) {
    
  }
 
  else {
    const next = array.slice();
    if(xIsNext) {
      next[i] = "X";
    }
    else {
      next[i] = "O";

    }
    nextarray(next);
    nextX(!xIsNext);
  }
  }
    

  let status;
  if(calculateWinner(array)) {
    status = "The Winner is: " + calculateWinner(array);
  }
  else if(isArrayFull(array)) {
    status = "Draw";
  }
  else {
    status = "Move: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
    <div >
      <div>{status}</div>
      <div className='board'>
        <MYbuttons value={array[0]} setValue={() => handleClick(0)}/>
        <MYbuttons value={array[1]} setValue={() => handleClick(1)}/>
        <MYbuttons value={array[2]} setValue={() => handleClick(2)}/>
      </div>
      <div className='board'>

        <MYbuttons value={array[3]} setValue={() => handleClick(3)}/>
        <MYbuttons value={array[4]} setValue={() => handleClick(4)}/>
        <MYbuttons value={array[5]} setValue={() => handleClick(5)}/>
      </div>
      <div className='board'>
        <MYbuttons value={array[6]} setValue={() => handleClick(6)}/>
        <MYbuttons value={array[7]} setValue={() => handleClick(7)}/>
        <MYbuttons value={array[8]} setValue={() => handleClick(8)}/>
      </div>
      </div>
    </>
  )
}


function calculateWinner(array) {
  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];


  for(let i = 0; i<wins.length; i++) {
    const [a, b, c] = wins[i];
    if(array[a] && array[a] === array[b] && array[a] === array[c]) {
      return array[a];
    }
  }
  return;
}




