import Image from 'next/image';
import React, { useState } from 'react';
import Ship1 from '../public/Ship3.png';
import Ship2 from '../public/Ship4.png';
import Ship3 from '../public/Ship5.png';
import Duck1 from '../public/Duck1.png';
import Duck2 from '../public/Duck2.png';
import Duck3 from '../public/Duck3.png';
import Bullet1 from '../public/Bullet1.png';
import Bullet2 from '../public/Bullet2.png';
import Bullet3 from '../public/Bullet3.png';
import Ability1 from '../public/Ability1.png';
import Ability2 from '../public/Ability2.png';
import Ability3 from '../public/Ability3.png';

export default function PlayModal({
  width,
  playModal,
  setPlayModal,
  start,
  setStart,
  captain,
  setCaptain,
  ship,
  setShip,
  name,
  setName,
}: any) {
  const changeCaptain = (cap: number) => (event: any) => {
    if (!start) setCaptain(cap);
  };

  const changeShip = (sh: number) => (event: any) => {
    if (!start) setShip(sh);
  };

  const changeName = (event: any) => {
    setName(event.target.value);
  };

  const changeStart = (event: any) => {
    if (start) {
      setStart(false);
    } else {
      setStart(true);
    }
  };

  return (
    <>
      <div
        id="myModal"
        className={`${playModal} fixed w-full h-full`}
        style={{
          maxWidth: width,
          background: 'rgba(0, 122, 255, 1.0)',
        }}
      >
        <div className="my-2 p-0 w-full h-full flex flex-col justify-between">
          <span
            className="text-white text-4xl self-end basis-1/12"
            onClick={() => {
              setPlayModal('hidden');
              setStart(false);
              setCaptain(0);
              setShip(0);
              setName('');
            }}
          >
            &times;
          </span>

          <div className="flex flex-col basis-6/12 justify-between">
            <span className="text-white">Captain:</span>
            <div className="flex flex-row justify-evenly basis-3/12">
              <div
                onClick={changeCaptain(0)}
                className={`card ${
                  captain === 0
                    ? 'outline outline-4 outline-offset-0 outline-orange-500'
                    : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              >
                <Image src={Duck1} width={50} height={50} alt="Duck 1" />
              </div>
              <div
                onClick={changeCaptain(1)}
                className={`card ${
                  captain === 1
                    ? 'outline outline-4 outline-offset-0 outline-orange-500'
                    : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              >
                <Image src={Duck2} width={50} height={50} alt="Duck 2" />
              </div>
              <div
                onClick={changeCaptain(2)}
                className={`card ${
                  captain === 2
                    ? 'outline outline-4 outline-offset-0 outline-orange-500'
                    : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              >
                <Image src={Duck3} width={50} height={50} alt="Duck 3" />
              </div>
            </div>

            <span className="text-white">Ship:</span>
            <div className="flex flex-row justify-evenly basis-3/12">
              <div
                onClick={changeShip(0)}
                className={`card ${
                  ship === 0
                    ? 'outline outline-4 outline-offset-0 outline-orange-500'
                    : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              >
                <Image src={Ship1} width={50} height={50} alt="Ship 1" />
              </div>
              <div
                onClick={changeShip(1)}
                className={`card ${
                  ship === 1
                    ? 'outline outline-4 outline-offset-0 outline-orange-500'
                    : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              >
                <Image src={Ship2} width={50} height={50} alt="Ship 2" />
              </div>
              <div
                onClick={changeShip(2)}
                className={`card ${
                  ship === 2
                    ? 'outline outline-4 outline-offset-0 outline-orange-500'
                    : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              >
                <Image src={Ship3} width={50} height={50} alt="Ship 3" />
              </div>
            </div>

            <div className="flex flex-row justify-evenly basis-1/12 mt-4">
              <div className="flex flex-col justify-center items-center">
                <p className="text-white mb-2">Special ability:</p>
                <div className="card" style={{ width: '50px', height: '50px' }}>
                  {captain === 0 ? (
                    <Image
                      src={Ability1}
                      width={50}
                      height={50}
                      alt="Ability1"
                    />
                  ) : captain === 1 ? (
                    <Image
                      src={Ability2}
                      width={50}
                      height={50}
                      alt="Ability2"
                    />
                  ) : captain === 2 ? (
                    <Image
                      src={Ability3}
                      width={50}
                      height={50}
                      alt="Ability3"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <p className="text-white mb-2">Projectile:</p>
                <div className="card" style={{ width: '50px', height: '50px' }}>
                  {ship === 0 ? (
                    <Image src={Bullet1} width={50} height={50} alt="Bullet1" />
                  ) : ship === 1 ? (
                    <Image src={Bullet2} width={50} height={50} alt="Bullet2" />
                  ) : ship === 2 ? (
                    <Image src={Bullet3} width={50} height={50} alt="Bullet3" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col basis-3/12">
            <div className="self-center">
              {start ? (
                <span className="text-white text-2xl">Searching...</span>
              ) : (
                <>
                  <span className="block text-sm font-medium text-white">
                    Name
                  </span>
                  <input
                    onChange={changeName}
                    value={name}
                    type="text"
                    className="text-black mb-6 rounded p-2"
                  />
                </>
              )}
            </div>

            <button
              onClick={changeStart}
              className="text-white fixed bottom-0 bg-slate-800 rounded p-4 text-xl"
              style={{
                width,
              }}
            >
              {!start ? 'Start' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
