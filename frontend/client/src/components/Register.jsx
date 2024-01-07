import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const  Register = () =>{
  const formRef = useRef(null); // Captura la referencia del formulario
  const navigate = useNavigate()

  const handleSbmit =  async (e) => { //esto es para reemplasar el usestate y hacerlo mas rapido y simple
      e.preventDefault(); 
      const dataForm = new FormData(formRef.current);//transforma la data del form html en un objeto iterable
      const data = Object.fromEntries(dataForm);  //dado un objeto iterator me lo transforma en una simple
      
      const response = await fetch('http://localhost:3000/api/session/register', {
          method:'POST',    
          headers: {
                  'Content-type': 'application/json',
              },
              body: JSON.stringify(data)
          });

          if (response.status === 200){
              const datos = await response.json();
              console.log(datos);  
              navigate('/login');  
          } else {
              console.log('Registro invalido')
          };
  };

  return (
         <div className="text-center my-5">
            <div className="container-fluid">
                <h2>Formulario de Registro</h2>
                <form onSubmit={handleSbmit} ref={formRef}>
                    <div className="mb-3">
                        <label htmlFor="first_name">Ingrese su nombre: </label>
                        <input type="text" name='first_name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name">Ingrese su apellido: </label>
                        <input type="text" name='last_name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age">Ingrese su edad: </label>
                        <input type="number" name='age' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Ingrese su email:</label>
                        <input type="mail" name='email' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Ingrese su contraseña:</label>
                        <input type="password" name='password' />
                    </div>
                    <button type='submit' className='btn btn-dark'>Registrar</button>
                </form>
                </div>
              </div>        
  );
};