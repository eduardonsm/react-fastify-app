import {useEffect, useState, useRef} from 'react'
import {FiTrash2} from 'react-icons/fi'
import {api} from './services/api'

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App(){

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  },[])

  async function loadCustomers(){
    const response = await api.get('/list');
    setCustomers(response.data);
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    if(!name || !email) return;
    api.post('/customer', {
      name: name,
      email: email
    }).then(() => {
      loadCustomers();
      nameRef.current!.value = '';
      emailRef.current!.value = '';
    })
  }

  async function handleDelete(id: string) {
    try {
      await api.delete('/deleteCustomer', {
        params: { id }
      });
      setCustomers(prev =>
        prev.filter(customer => customer.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente. Veja o console.");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center px-4 bg-gray-900">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl text-white font-medium">Clientes</h1>
        <form className="flex flex-col gap-4 my-6" onSubmit={handleSubmit}>
          <label className=" text-white font-medium"> Nome: </label>
          <input type="text"
          placeholder="Digite seu nome..." 
          className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          ref={nameRef}
          />  
          
          <label className=" text-white font-medium"> Email: </label>
          <input type="email"
          placeholder="Digite seu melhor email..." 
          className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          ref={emailRef}
          />  
          
          <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
        </form>


        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article key={customer.id} className="w-full bg-white rouded-md p-2 relative hover:scale-105 transition-all duration-200">
              
              <p> <span className="font-medium">Nome:</span> {customer.name}</p>
              <p> <span className="font-medium">Email:</span> {customer.email}</p>
              <p> <span className="font-medium">Status:</span> {customer.status ? "ATIVO" : "DESATIVADO"} </p>
              <button 
              onClick={() => handleDelete(customer.id)}
              className='absolute right-2 top-2 hover:border-2 hover:rounded hover:border-red-600 '><FiTrash2 size={18} color="#F22"/> </button>
            </article>
          ))
          }
        </section>
      </main>
    </div>
  )
}
