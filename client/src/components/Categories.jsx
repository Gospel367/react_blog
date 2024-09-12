import { useContext, useEffect, useState } from 'react'
import Button from './Button'
import { Mycontext } from './Mycontext'



const Categories = ({ filter, setFilter }) => {
    const {categories, setCategories, fetchData} = useContext(Mycontext)
    const catfilter = (category) => {
        fetchData();
        setFilter(category);
        console.log(category.category)
    }


    
    return (
        <div>
            <ul className='header-navigation'>
                {categories.map((category) =>
                (
                    <li key={category.id}>
                        <Button name={category.category} button_name={category.category} onclick={() => catfilter(category)} />
                    </li>

                )

                )}
            </ul>
        </div>
    )
}

export default Categories
