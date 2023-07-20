import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BoardPage from './pages/Board/Board';
import Calendar from './pages/Calendar/Calendar';
import DataGridRefugee from './pages/DataGrid/DataGridRefugee';
import UpdateHelper from './pages/UpdateHelper/UpdateHelper';
import DataGridHelper from './pages/helper/DataGridHelper';
import { useEffect, useState } from 'react';
import Register from './pages/Register/Register';
import Login from './pages/login/login';
import DataGridTruck from './pages/trucks/DataGridTruck';
import AddRefugee from './pages/AddRefugee/AddRefugee';
import AddHelper from './pages/AddHelper/AddHelper';
import AddTruck from './pages/AddTruck/AddTruck';
import Manger from './pages/Manger/Manger';
import AddCenter from './pages/AddCenter/AddCenter';
import Fuzzy from './pages/Fuzzy/Fuzzy';


const App = () => {

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isManger, setIsManger] = useState(false);
  const [verify_email, set_verify_email] = useState(false);
  const [first_name, set_first_name] = useState();
  const [last_name, set_last_name] = useState();
    const [centerData, setCenterData] = useState();
  const [email, set_email] = useState();
  const [centerId, setCenterId] = useState();
  useEffect(() => {
    console.log(verify_email)
    console.log(first_name)
    console.log(last_name)
    console.log(email)
    if(email === 'johnmikegithub@gmail.com') setIsManger(true)
  },[isLoggedIn])

  return (
    <div id="dashboard">
    <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Layout isManger={isManger} centerId={centerId} centerData={centerData} setCenterData={setCenterData} email={email} verify_email={verify_email} first_name={first_name} last_name={last_name} />}>
                  <Route path="manger" element={<Manger centerId={ centerId} />} />            
                  <Route path = "calendar" element = { <Calendar />} />
                  <Route path="board" element={<BoardPage />} />
                  <Route path="Refugee" element={<DataGridRefugee centerId={ centerId} />} />
                  <Route path="helper" element={<DataGridHelper centerId={ centerId} />} />
                  <Route path="fuzzy" element={<Fuzzy centerId={ centerId} />} />
                  <Route path="trucks" element={<DataGridTruck centerId={ centerId} />} />
                  <Route path="add-refugee" element={<AddRefugee centerId={ centerId} />} />
                  <Route path="add-center" element={<AddCenter centerId={ centerId} />} />
                  <Route path="add-helper" element={<AddHelper centerId={ centerId} />} />
                  <Route path="add-truck" element={<AddTruck centerId={ centerId} />} />
                  <Route path="update-helper" element={<UpdateHelper centerData={centerData} centerId={centerId} />} />
              <Route path="manger" element={<Manger centerId={centerId} />} />
            </Route>
          ) : (
              <Route path="/" element={
                <Login
                  set_email={set_email}
                  set_first_name={set_first_name}
                  set_last_name={set_last_name}
                  set_verify_email={set_verify_email}
                  setCenterId={setCenterId}
                  setIsManger={setIsManger}
                setisLoggedIn={setisLoggedIn}
              />} />
          )}
          <Route path='/register' element={<Register setisLoggedIn={setisLoggedIn} />} />
        </Routes>
    </BrowserRouter>
  </div>
  )
};

export default App;
