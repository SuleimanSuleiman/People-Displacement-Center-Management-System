import css from './Sidebar.module.css';
import { FaStudiovinari } from "react-icons/fa";
import { AiFillCalendar, AiOutlineTable ,AiOutlineForm} from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const Sidebar = ({isManger}) => {
    return (
        <div className={css.container}>

            <img src="./logo.png" alt="logo" className={css.logo} />


            <div className={css.menu}>

          {
            isManger ?
              (
                <>
                 <NavLink
                    to="manger"
                    className={css.item}
                    title="Helper"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}
                >
                    
                    <AiOutlineTable size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                    }} >Manger</span>
                </NavLink>
                 <NavLink
                    to="add-center"
                    className={css.item}
                    title="ADD CENTER"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}
                >
                    
                    <AiOutlineForm size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                    }} >Add Center</span>
                  </NavLink>
                 <NavLink
                    to="fuzzy"
                    className={css.item}
                    title="Fuzzy "
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}
                >
                    
                    <FaStudiovinari size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                      textAlign:'center'
                    }} >Study Build Center</span>
                  </NavLink>
                                  <NavLink
                    to="calendar"
                    className={css.item}
                    title="Calendar"
                >
                    <AiFillCalendar size={30} />
                </NavLink>

                <NavLink
                    to="board"
                    className={css.item}
                    title="Trello Board"
                >
                    <FaTasks size={30} />
                  </NavLink>
                </>
                
              ):
                (
                <>
                <NavLink
                to="Refugee"
                className={css.item}
                title="Refugee"
                    style={{
                      display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                >
                    
                    <FaStudiovinari size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                    }} >Refugee</span>
                </NavLink>
                <NavLink
                    to="helper"
                    className={css.item}
                    title="Helper"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}
                >
                    
                    <AiOutlineTable size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                    }} >Helper</span>
                </NavLink>

                <NavLink
                    to="trucks"
                    className={css.item}
                    title="Trucks"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}
                >
                    
                    <AiOutlineTable size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                      cursor: 'pointer',
                    }} >Trucks</span>
                </NavLink>

                <NavLink
                    to="add-helper"
                    className={css.item}
                    title="Add Helper"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}
                >
                    
                    <AiOutlineForm size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                        cursor: 'pointer',
                      textAlign: 'center'
                    }} >Add Helper</span>
                </NavLink>

                <NavLink
                    to="add-refugee"
                    className={css.item}
                    title="Add Refugee"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        alignItems: 'center',
                            
                    }}
                >
                    
                    <AiOutlineForm size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                        cursor: 'pointer',
                      textAlign: 'center'
                    }} >Add Refugee</span>
                </NavLink>

                <NavLink
                    to="add-truck"
                    className={css.item}
                    title="Add Truck"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        alignItems: 'center',
                            
                    }}
                >
                    
                    <AiOutlineForm size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }} >Add Truck</span>
                </NavLink>

                <NavLink
                    to="update-helper"
                    className={css.item}
                    title="Update Helper"
                    style={{
                          display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                          }}
                >
                    
                    <AiOutlineForm size={30} />
                    <span style={{
                      textDecoration: 'none',
                      color: '#ccc',
                        cursor: 'pointer',
                      textAlign: 'center'
                    }} >Update Helper</span>
                </NavLink>

                <NavLink
                    to="calendar"
                    className={css.item}
                    title="Calendar"
                >
                    <AiFillCalendar size={30} />
                </NavLink>

                <NavLink
                    to="board"
                    className={css.item}
                    title="Trello Board"
                >
                    <FaTasks size={30} />
                  </NavLink>
              </>
            )
      }
            </div>
        </div>
    )
}

export default Sidebar