export const generateUserErrorInfo = (user) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name : needs to be a String, received ${user.first_name}
    * last_name : needs to be a String, received ${user.last_name}
    * email : needs to be a String, received ${user.email}`
}

export const generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * title : needs to be a String, received ${product.title}
    * price : needs to be a Number, received ${product.price}
    * category : needs to be a String, received ${product.category}`
}