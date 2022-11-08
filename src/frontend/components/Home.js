import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import logo from './assets/logo.png'

const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

const Home = ({ web3Handler, account, nft, ticketsLeft }) => {

    const triggerMint = async () => {
        // Connect
        if (account == null) {
            web3Handler();
            return;
        }

        console.log("triggerMint");
        await nft.mint()
    }

    return (
        <div className="m-0 p-0 container-fluid">
            <Row className="frame m-0 p-0 container-fluid" >
                <Row className="splashScreen my-3 p-5 container-fluid" style={{ fontSize: "4vh"}} >
                    <Row className="mx-auto mt-4">
                        <h2 className="mt-4" style={{ fontSize: "5vh"}}>Else Exchange Ticket Free Mint</h2>
                    </Row>
                    <Row className="mx-auto mt-0 mb-4">
                    </Row>
                </Row>
            </Row>
        </div>
    );
}
export default Home