import Dashboard from './Dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Tags from './components/Tags'
// import Addtag from './components/Addtag'
import Login from './components/Login'
import { AuthContext } from './context/Authcontext'
import { useContext } from 'react'
import Updateinput from './components/Updateinput'
import Forgetpassword from './components/Forgetpassword'
import WorkerTable from './components/WorkersInfotable'
import { Workerinput } from './components/Workersinput'
import { Addnewworker } from './components/Addnewworker'
import Allworkers from './components/Allworkers'
import Singleworker from './components/Singleworker'
import Updateworkers from './components/Updateworkers'
import Attandence from './components/Attandence'
import Addproducts from './components/Addproducts'
import Productstable from './components/Productstable'
import Invoice from './components/Invoice'
import Editproducts from './components/Editproducts'

function App() {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />
  }

  const RequireAuthlogin = ({ children }) => {
    return currentUser == null ? children : <Navigate to='/' />

  }


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RequireAuth><Dashboard /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/tags' element={<RequireAuth><Tags /></RequireAuth>} />
        </Routes>
        <Routes>
          <Route path='/update/:userid' element={<RequireAuth><Updateinput /></RequireAuth>} />
        </Routes>


        <Routes>
          <Route path='/login' element={<RequireAuthlogin><Login /></RequireAuthlogin>} />
        </Routes>

        <Routes>
          <Route path='/forgetpassword' element={<RequireAuthlogin><Forgetpassword /></RequireAuthlogin>} />
        </Routes>

        <Routes>
          <Route path='/workers' element={<RequireAuth><WorkerTable /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/workerinput' element={<RequireAuth><Workerinput /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/addnewWorker' element={<RequireAuth><Addnewworker /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/allworkers' element={<RequireAuth><Allworkers /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/singleWorker/:userid' element={<RequireAuth><Singleworker /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/updateworker/:userid' element={<RequireAuth><Updateworkers /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/attendance' element={<RequireAuth><Attandence /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/addproducts' element={<RequireAuth><Addproducts /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/allproducts' element={<RequireAuth><Productstable /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/invoice' element={<RequireAuth><Invoice /></RequireAuth>} />
        </Routes>

        <Routes>
          <Route path='/editproduct/:productid' element={<RequireAuth><Editproducts /></RequireAuth>} />
        </Routes>
      </BrowserRouter>




    </div>
  )
}

export default App
