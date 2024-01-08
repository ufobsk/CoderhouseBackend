import "../../App.css";
import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams, useLocation } from "react-router-dom";

import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/Firebase/firebaseConfig";


const ItemListContainer = ({greeting}) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { categoryId } = useParams()
    
    const location = useLocation()
    
    const isRoot = location.pathname === '/'

    useEffect(() => {
        
        setLoading(true)

        const collectionRef = categoryId
            ? query(collection(db, 'items1'), where('category', '==', categoryId))
            : collection(db, 'items1')
        
        getDocs(collectionRef)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data()
                    return {id: doc.id, ...data}
                })
            setProducts(productsAdapted)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
        
    }, [categoryId])
    
    if (loading) {
        return <div>Cargando...</div>
    }
    
    return (
        <div>
            { isRoot ? (
                <>
                    <h1 className="greeting">{greeting}</h1>
                    <br />
                    <h2 id="greetingHome">The best beats in Argentina are here!</h2>
                    <section id="SectionHome">
                        <img src="img/studio1.jpg" alt="Studio" />
                        <img src="img/studio2.jpeg" alt="Studio" />
                        <img src="img/studio3.jpg" alt="Studio" />
                    </section>
                </>
            ) : null }
            <ItemList items1={products}/>
        </div>
    );
};

export default ItemListContainer;