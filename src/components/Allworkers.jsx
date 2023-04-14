import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { db, auth } from '../Firbase';
import upper from '../imgs/pooltecuper.jpeg';
import lower from '../imgs/poolteclower.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import Widgets from './Widgets';
import { Model } from './Model';
import { getDatabase, set, ref, update, push, onValue, remove } from 'firebase/database';
import Sidebar from './Sidebar';
import { ModalContext } from '../context/Modalcontext';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Allworkers = () => {


    const [mylist, setmylist] = useState([]);
    const [search, setsearch] = useState('');
    const [filtered, setfiltered] = useState([]);
    const navigate = useNavigate();
    // const [showmodal, setshowmodal] = useState(false);
    const [delid, setdelid] = useState('');

    let { showmodal, deletemodal } = useContext(ModalContext)





    // -----------------------------------Delete Worker----------------------------------


    const handleDelete = () => {
        remove(ref(db, `/workers/${delid}`))
        setdelid('')
    }




    let modalseter = (id) => {
        showmodal()
        setdelid(id)
    }




    // --------------------------geting the user data from firebase------------------------

    useEffect(() => {
        let getingdata = async () => {

            const starCountRef = ref(db, '/workers');
            onValue(starCountRef, async (snapshot) => {
                const data = await snapshot.val();
                //  console.log(data)
                MediaKeyStatusMap
                setmylist(Object.values(data))
                setfiltered(Object.values(data))

                // updateStarCount(postElement, data);
            });
        }

        getingdata();


    }, [])


    //----------------------Filtering the userdata (search functionality)--------------------

    useEffect(() => {
        const result = mylist.filter((user) => {
            return user.workerName.toLowerCase().match(search.toLowerCase()) || user.email.toLowerCase().match(search.toLowerCase()) || user.cnic.toLowerCase().match(search.toLowerCase());

        })

        setfiltered(result);
    }, [search])









    console.log('list', mylist)

    // const handleDelete = (id) => {
    //   //  try {
    //   remove(ref(db, `users/${id}`))
    // }


    // let [toggle, settoggle] = useState([])
    // let toglesetter = (status, id) => {
    //     if (status === true) {
    //         update(ref(db, `//userdata/${id}`), { status: false })
    //     }
    //     else {
    //         update(ref(db, `//userdata/${id}`), { status: true })
    //     }
    // }
    const Editdata = (id) => {
        navigate(`/updateworker/${id}`)
    }

    const view = (id) => {
        navigate(`/singleWorker/${id}`)
    }




    let sr = 0;

    const columns = [
        {
            name: "Sr",
            selector: (_, index) => index + 1,
            sortable: false,
            width: "60px"
        },
        // { name: 'Sr', cell: (row) => { sr += 0.5; return sr }, sortable: true, },
        { name: 'Worker name', selector: (row) => { return row.workerName }, sortable: true, width: '150px' },
        { name: 'Email', selector: (row) => { return row.email }, sortable: true, },
        { name: 'Password', selector: (row) => { return row.password }, sortable: true, },
        { name: 'CNIC', selector: (row) => { return row.cnic }, sortable: true, },
        { name: 'Phone', selector: (row) => { return row.phone }, sortable: true, },
        { name: 'Sallary', selector: (row) => { return row.sallary }, sortable: true, },
        { name: 'Address', selector: (row) => { return row.address }, sortable: true, width: '150px' },
        { name: 'Joining Date', selector: (row) => { return row.joiningdate }, sortable: true, width: '120px' },
        // { name: 'InActive Date', selector: (row) => { return row.inactiveDate }, sortable: true, width: '120px' },
        // { name: 'Creation Date', selector: (row) => { return row.creationDate }, sortable: true, width: '130px' },
        // // { name: 'Age', selector: 'age', sortable: true ,},
        { name: 'Actions', cell: (row) => (<div className='flex '><button className='h-[40px] w-[70px] border bg-[#35A1CC] rounded-md text-white mr-2' onClick={() => Editdata(row.id)}>Edit</button> <button className='h-[40px] w-[70px] border bg-[#f44336] rounded-md text-white' onClick={() => { return modalseter(row.id) }} >Delete</button></div>), width: '175px' },
        // onClick={() => { return modalseter(row.id) }}
        { name: 'View', cell: (row) => (<div className='flex '><button className='h-[40px] w-[70px] border bg-[#35A1CC] rounded-md text-white mr-2' onClick={() => view(row.id)}>View</button></div>), width: '175px' },

        // { name: 'Status', cell: (row) => row.status === true ? (<div className='h-[24px] w-[45px] bg-[#35A1CC] rounded-xl relative'><div className='h-[22px] w-[22px] bg-white rounded-full absolute top-[1px] border right-[-1px]' onClick={() => { return toglesetter(row.status, row.id) }} ></div></div>) : (<div className='h-[24px] w-[45px] bg-[#707070] rounded-xl relative'><div className='h-[22px] w-[22px] bg-white rounded-full absolute top-[1px] border left-[-1px]' onClick={() => { return toglesetter(row.status, row.id) }}></div></div>) },

    ];


    let delmsg = 'Are you sure to delete this worker ?'

    return (
        <>
            {deletemodal && <Model delfunc={handleDelete} msg={delmsg} />}
            <div className='flex'>
                <Sidebar />
                <div className='relative'>
                    {/* {deletemodal && <Model delfunc={handleDelete} msg={delmsg} />} */}
                    <img src={upper} />
                    <Link to='/addnewWorker'><div className='h-[45px] border w-[210px] absolute right-6 flex justify-center items-center bg-[#35A1CC] text-white cursor-pointer'>Add new worker +</div></Link>
                    <div className='w-[1070px]  ml-[45px] mt-[60px] relative'>
                        <div className='border' >
                            <DataTable columns={columns} data={filtered} style={{ width: '1200px' }} wrapperStyle={{ backgroundColor: '#DAECF3' }} pagination fixedHeader subHeader subHeaderComponent={<div className=' h-[70px]'><h2 className='text-xl  font-[450]'>Search</h2> <input type='search' placeholder='Search here' className=' h-[25px] w-[310px] border-b-[1px]   p-1 outline-none placeholder:text-sm' value={search} onChange={(e) => { setsearch(e.target.value) }} /> </div>} subHeaderAlign='left' />
                        </div>
                        <br />

                    </div>
                    {/* <img src={lower} /> */}
                </div>
            </div>
        </>
    )
}

export default Allworkers