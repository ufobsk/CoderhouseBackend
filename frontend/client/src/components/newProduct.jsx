import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export const  NewProduct = () =>{
  const formRef = useRef(null); // Captura la referencia del formulario
  const navigate = useNavigate()

  const handleSbmit =  async (e) => { //esto es para reemplasar el usestate y hacerlo mas rapido y simple
      e.preventDefault(); 
      const dataForm = new FormData(formRef.current);//transforma la data del form html en un objeto iterable
      const data = Object.fromEntries(dataForm);  //dado un objeto iterator me lo transforma en una simple

      const cookieArray = document.cookie.split('; ')
      let token = null
      for (const cookie of cookieArray) {
          const [name, value] = cookie.split("=")
          if (name == "jwtToken") {
              token = value
              break
          }
      }
      console.log(data)
      console.log(token)
      const response = await fetch('http://localhost:3000/api/products', {
          method:'POST',    
          headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(data)
          });

          if (response.status === 200 || response.status === 201){
              const datos = await response.json();
              console.log(datos);  
              navigate('/');  
          } else {
              console.log('Error en crear producto')
          };
  };

  return (
         <div className="text-center my-5">
            <div className="container-fluid">
                <h2>Formulario de creacion del producto </h2>
                    <form onSubmit={handleSbmit} ref={formRef}>
                        <div className="mb-3">
                            <label htmlFor="title">Ingrese el nombre: </label>
                            <input type="text" name='title' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Ingrese la descripcion: </label>
                            <input type="text" name='description' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category">Ingrese la categoria: </label>
                            <input type="text" name='category' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Ingrese el precio: </label>
                            <input type="number" name='price' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock">Ingrese el stock</label>
                            <input type="number" name='stock' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="code">Ingrese el codigo</label>
                            <input type="text" name='code' />
                        </div>
                        <button type='submit' className='btn btn-dark'>Crear producto</button>
                    </form>
                </div>
              </div>        
  );
};