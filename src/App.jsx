import { useState,useEffect } from 'react';
import './App.css'
function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions)
  },[]);

  async function getTransactions() {
    const url = import.meta.env.VITE_API_URL + '/api/transactions';
    const response = await fetch(url);
    return await response.json();

  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL + '/api/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
         price,
         name:name.substring(price.length + 1),
         description, 
         datetime 
        })
    }).then(res => {
      setName('');
      setDatetime('');
      setDescription('');
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(json => {
      console.log('result', json);
    })
    .catch(err => {
      console.error('Error:', err);
    });

  }
  
  let balance = 0;
  for(const transaction of transactions) {
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2); // Now it is string 
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (

    <main className='max-w-sm mx-auto my-10'>
      <h1 className='text-center text-5xl'>{balance}<span>.{fraction}</span></h1>
      <form className='mt-5' onSubmit={addNewTransaction}>
        <div className="flex gap-1 mb-1">
          <input type="text"
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder={'+200 new Samsung TV'} className="w-full bg-transparent text-white border-2 border-gray-600 py-0.5 px-1 rounded-md" />

          <input type="datetime-local"
            value={datetime} onChange={(e) => setDatetime(e.target.value)}
            className="w-full bg-transparent text-gray-400 border-2 border-gray-600 py-0.5 px-1 rounded-md" />
        </div>

        <div className="description">
          <input type="text"
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder={'description'} className="w-full bg-transparent text-white border-2 border-gray-600 py-0.5 px-1 rounded-md" />
        </div>

        <button type='submit' className='w-full bg-gray-200 text-black my-1 rounded-md p-1'>Add new Transaction</button>
        
      </form>
      <div className='transactions mt-2.5'>
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction flex py-1 px-0 justify-between border-t border-gray-600 first:border-t-0">
          <div className="left">
            <div className="name text-xl text-gray-300 ">{transaction.name}</div>
            <div className="description text-base text-gray-400 ">{transaction.description}</div>
          </div>
          <div className="right text-right">
          <div className={`price ${transaction.price < 0 ? 'text-red-400' : 'text-green-500'}`}>
           {transaction.price}</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
        ))}
        
        

      </div>
    </main>
  )
}

export default App
