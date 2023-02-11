
import css from 'styled-jsx/css'
import Filter from '../components/Filter/Filter'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import AboutUs from '../footc/AboutUs'
// import styles from "./../../styles/Home.module.scss"

const About = () => {
  return (
    <div>
         <Navbar></Navbar>
    <Filter></Filter>
    <AboutUs></AboutUs>
    <Footer></Footer>
    </div>
  )
}

export default About