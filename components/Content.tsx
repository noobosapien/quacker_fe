import React, { IframeHTMLAttributes, useEffect, useState } from 'react';
import styles from '../styles/Content.module.css';
import PlayModal from './PlayModal';

export default function Content() {
  const [width, setWidth] = useState('100vw');
  const [height, setHeight] = useState('100vh');
  const [hide, setHide] = useState('block');

  const [playModal, setPlayModal] = useState('hidden');
  const [start, setStart] = useState(false);
  const [ws, setWs] = useState<WebSocket>();
  const [captain, setCaptain] = useState(0);
  const [ship, setShip] = useState(0);
  const [name, setName] = useState('');

  const [PID, setPID] = useState(0);

  const resetAll = () => {
    setPlayModal('hidden');
    setHide('hidden');
    setStart(false);
    setCaptain(0);
    setShip(0);
    setName('');
  };

  const handleResize = () => {
    if (window.innerWidth > window.innerHeight) {
      setWidth(window.innerHeight + 'px');
    } else {
      setWidth(window.innerWidth + 'px');
    }

    setHeight(window.outerHeight + 'px');
  };

  useEffect(() => {
    if (window.innerWidth > window.innerHeight) {
      setWidth(window.innerHeight + 'px');
    } else {
      setWidth(window.innerWidth + 'px');
    }
    setHeight(window.outerHeight + 'px');
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getPID = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;

        // let response = await fetch('http://localhost:3000/pid/', {
        let response = await fetch('http://192.168.1.16:3000/pid/', {
          method: 'GET',
          signal,
        });

        const result = await response.json();

        if (result && result.pid) {
          setPID(result.pid);
        }

        //websocket

        const wss = new WebSocket('ws://192.168.1.16:3001/');
        // const wss = new WebSocket('ws://localhost:3001/');

        wss.onopen = async function (e) {
          console.log('Connection to the index ws server opened');
        };

        setWs(wss);
      } catch (e) {
        console.log(e);
      }
    };

    getPID();
  }, []);

  useEffect(() => {
    const recv = (message: any) => {
      const data = JSON.parse(message.data);

      if (data.start) {
        console.log('Start from server');
        //tell iframe to connect and start
        //hide the frontend

        if (document) {
          const frame: any = document.getElementById('if');
          frame?.contentWindow?.postMessage(
            {
              target: 'IGQ',
              name: 'START',
              value: {
                PID,
                name,
              },
            },
            '*'
          );
        }

        resetAll();

        // if (startGame) {
        //   startGame(pid, plName, data.player);
        // }
      } else {
        console.log('an error occured');
      }
    };

    ws?.removeEventListener('message', recv);
    ws?.addEventListener('message', recv);
  }, [ws, name, PID]);

  useEffect(() => {
    if (PID > 0 && ws?.readyState === 1) {
      if (start) {
        ws.send(JSON.stringify({ pid: PID, start: true, captain, ship, name }));
      } else {
        console.log('cancel');
      }
    }
  }, [start, PID, ws, captain, ship, name]);

  const playNow = () => {
    setPlayModal('block');
  };

  return (
    <div className={`flex flex-row justify-center content-center relative`}>
      <div
        className={`${hide} text-white flex flex-col absolute mt-8`}
        style={{
          width,
        }}
      >
        <div className="flex flex-row justify-between">
          <button>Info</button>
          <button>Account</button>
        </div>

        <h1 className="text-4xl my-10 self-center">Lethal Duckies</h1>

        <div className={`flex flex-row justify-around`}>
          <button>Download from play store</button>
          <button>Download from app store</button>
        </div>

        <div className="flex flex-row justify-around my-10">
          <div className="card">
            <p className="text-black">Item 1</p>
          </div>
          <div className="card">
            <p className="text-black">Item 2</p>
          </div>
          <div className="card">
            <p className="text-black">Item 3</p>
          </div>
        </div>

        <div className="flex flex-col items-center my-4">
          <h1>Free to play ducks</h1>

          <div className="flex flex-col justify-around my-4">
            <div className="card mb-2"></div>
            <div className="card mb-2"></div>
            <div className="card mb-2"></div>
          </div>

          <h1>Free to play ships</h1>

          <div className="flex flex-col justify-around mt-4 mb-12">
            <div className="card mb-2"></div>
            <div className="card mb-2"></div>
            <div className="card mb-2"></div>
          </div>
        </div>

        <div
          className="card fixed bottom-1 w-full flex flex-col items-center bg-amber-100"
          style={{ maxWidth: width }}
          onClick={playNow}
        >
          <h1 className="text-black text-xl">Play now!</h1>
          <p className="text-xs text-black">No downloads</p>
        </div>
      </div>

      <PlayModal
        width={width}
        playModal={playModal}
        setPlayModal={setPlayModal}
        start={start}
        setStart={setStart}
        captain={captain}
        setCaptain={setCaptain}
        ship={ship}
        setShip={setShip}
        name={name}
        setName={setName}
      />

      <iframe
        // src="http://localhost:3000"
        src="http://192.168.1.16:3000"
        // src="https://server.wondersplot.com"
        id="if"
        style={{
          height: '100vh',
          width,
        }}
      />
    </div>
  );
}
