import {useState} from 'react'
import CardKardexStudent from './CardKardexStudent'
import ListSubjects from './ListSubjects'

export default function KardexStudent() {
  
    const [indexCardsKardex, setIndexCardsKardex] = useState(0)
    const [ListCardsKardex, setListCardsKardex] = useState<JSX.Element[]>([<CardKardexStudent/>, <ListSubjects/>])

    return (
        <div className='w-full mt-4'>
        <div className='w-9/12 mx-auto'>
            <ul className='w-full flex'>
                <li>
                    <button 
                        className='bg-orangeLight p-2 text-white mx-1'
                        onClick={e => {setIndexCardsKardex(0)}}
                        >
                        Kardex
                    </button>
                </li>
                <li>
                    <button 
                        className='bg-orangeLight p-2 text-white mx-1'
                        onClick={e => {setIndexCardsKardex(1)}}
                        >
                        Materias
                    </button>
                </li>
                <li>
                    <button className='bg-orangeLight p-2 text-white mx-1'>
                        Horarios
                    </button>
                </li>
            </ul>
        </div>
        {
            ListCardsKardex[indexCardsKardex]
        }
    </div>
  )
}
