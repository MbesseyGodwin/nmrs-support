import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "animate.css/animate.min.css";

function RedirectDashboard({ delay = 30000, countdownStep = 1 }) {
    const [state, setState] = useState({ countdown: delay / 1000, progress: 0 });
    const [currentNote, setCurrentNote] = useState(0);
    const history = useHistory();

    const handleTimer = useCallback(() => {
        const timer = setTimeout(() => {
            history.replace('/dashboard');
        }, delay);

        const interval = setInterval(() => {
            setState(prevState => {
                const newCountdown = prevState.countdown - countdownStep;
                return {
                    countdown: newCountdown,
                    progress: (delay - newCountdown * 1000) / delay * 100,
                };
            });
        }, countdownStep * 1000);

        const noteTimer = setTimeout(() => {
            setCurrentNote(1);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
            clearTimeout(noteTimer);
        };
    }, [countdownStep, delay, history]);

    useEffect(handleTimer, [handleTimer]);

    function hideNote0() {
        setTimeout(() => {
            const note0 = document.getElementById('note0');
            if (note0) {
                note0.style.display = 'none';
            }
        }, 7500);
    }
    hideNote0();

    function hideNote1() {
        setTimeout(() => {
            const note1 = document.getElementById('note1');
            if (note1) {
                note1.style.display = 'none';
            }
        }, 15000);
    }
    hideNote1();

    function hideNote2() {
        setTimeout(() => {
            const note2 = document.getElementById('note2');
            if (note2) {
                note2.style.display = 'none';
            }
        }, 22500);
    }
    hideNote2();

    function hideNote3() {
        setTimeout(() => {
            const note3 = document.getElementById('note3');
            if (note3) {
                note3.style.display = 'none';
            }
        }, 30000);
    }
    hideNote3();

    const notes = [
        { text: 'the nmrs support is for analysis purpose', threshold: 30 },
        { text: 'data used is gotten from the openmrs db', threshold: 22.5 },
        { text: 'powered by caritas Health informatics', threshold: 15 },
        { text: `Redirecting to Dashboard in  ${state.countdown}`, threshold: 7.5 },
    ];

    const currentNotes = notes.filter(note => state.countdown <= note.threshold);

    return (
        <div>
            <div className='d-flex justify-content-center m-1'>
                <b className='h1' style={{ 'visibility': 'hidden' }}>1</b>
                {currentNotes.map((note, index) => (
                    <div className='animate__animated animate__flipInX animated'>
                        <span className='text-dark h1 text-lowercase' id={`note${index}`} key={index} style={{ fontFamily: 'cursive, sans-serif' }}>{note.text}</span>
                    </div>

                ))}
            </div>
            <ProgressBar
                now={state.progress}
                label={`${state.progress.toFixed()}%`}
                variant="dark"
                // style={{ "flexDirection": "row-reverse" }} 
                className='border bg-light'
            />
        </div>
    );
}

RedirectDashboard.propTypes = {
    delay: PropTypes.number,
    countdownStep: PropTypes.number,
};

export default RedirectDashboard;
