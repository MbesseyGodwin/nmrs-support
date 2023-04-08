import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import './styles.css';

function ComingSoon() {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const targetDate = new Date('2023-05-21T00:00:00');
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;
      if (timeLeft >= 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');
        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark text-light mt-5">
      <Container className='p-5'>
        <Row>
          <Col md={6} className="text-center">
            <h1 className="display-2">Coming Soon</h1>
            <p className="lead">We are working hard to bring you something awesome. Stay tuned!</p>
          </Col>
          <Col md={6} className="text-center">
            <div className="countdown">
              <p className="lead">Countdown to launch:</p>
              <div className="countdown-timer">
                <div className="container border border-light rounded m-0 p-0">
                  <table className='table table-bordered table-dark'>
                    <thead>
                      <tr>
                        <th><span className="text-light days display-4">{countdown.days}</span></th>
                        <th><span className="text-light hours display-4">{countdown.hours}</span></th>
                        <th> <span className="text-light minutes display-4">{countdown.minutes}</span></th>
                        <th><span className="text-light seconds display-4">{countdown.seconds}</span></th>
                      </tr>
                    </thead>
                    <tbody className='text-capitalize'>
                      <tr>
                        <td>days</td>
                        <td>hours</td>
                        <td>minutes</td>
                        <td>seconds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default ComingSoon;
