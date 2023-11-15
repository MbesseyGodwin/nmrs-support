import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "animate.css/animate.min.css";

function RedirectDashboard({ delay = 30000, countdownStep = 1 }) {
    const [state, setState] = useState({ countdown: delay / 1000, progress: 0 });
    const [currentNote, setCurrentNote] = useState(0);
    const history = useHistory();

    // useCallback to memoize handleTimer function
    const handleTimer = useCallback(() => {
        // Timer to redirect to the dashboard after the specified delay
        const timer = setTimeout(() => {
            history.replace('/dashboard');
        }, delay);

        // Interval to update countdown and progress every second
        const interval = setInterval(() => {
            setState(prevState => ({
                countdown: prevState.countdown - countdownStep,
                progress: (delay - (prevState.countdown - countdownStep) * 1000) / delay * 100,
            }));
        }, countdownStep * 1000);

        // Timer to show the next note after 3 seconds
        const noteTimer = setTimeout(() => {
            setCurrentNote(prevNote => prevNote + 1);
        }, 3000);

        // Cleanup function to clear timers and intervals
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
            clearTimeout(noteTimer);
        };
    }, [countdownStep, delay, history]);

    // Effect to run handleTimer on component mount
    useEffect(handleTimer, [handleTimer]);

    // Function to hide notes based on their respective timeouts
    const hideNote = (index, timeout) => {
        setTimeout(() => {
            const note = document.getElementById(`note${index}`);
            if (note) {
                note.style.display = 'none';
            }
        }, timeout);
    };

    // Hiding notes using hideNote function
    hideNote(0, 7500);
    hideNote(1, 15000);
    hideNote(2, 22500);
    hideNote(3, 30000);

    // Array of notes with their text and threshold
    const notes = [
        { text: 'if you can think it, you can do it', threshold: 30 },
        { text: 'never give up, time heals everything', threshold: 22.5 },
        { text: 'Success is not final, failure is not fatal', threshold: 15 },
        { text: `The only way to do great work is to love what you do.`, threshold: 7.5 },
    ];    

    // Filter notes based on the current countdown time
    const currentNotes = notes.filter(note => state.countdown <= note.threshold);

    return (
        <div>
            <div className='d-flex justify-content-center m-1'>
                <b className='h1' style={{ visibility: 'hidden' }}>1</b>
                {currentNotes.map((note, index) => (
                    <div className='animate__animated animate__flipInX animated' key={index}>
                        <span className='text-dark h2 text-lowercase' id={`note${index}`} style={{ fontFamily: 'cursive, sans-serif' }}>{note.text}</span>
                    </div>
                ))}
            </div>
            <ProgressBar
                now={state.progress}
                label={`${state.progress.toFixed()}%`}
                variant="dark"
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
