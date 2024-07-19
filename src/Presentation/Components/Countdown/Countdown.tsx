import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import './Countdown.css'

type Timer = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: string;
}

const padWithZero = (num: number): string => {
    return num.toString().padStart(2, '0');
};


const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
    const calculateTimeLeft = (): Timer | undefined => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: Timer | undefined;

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<Timer | undefined>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (timeLeft)
        Object.keys(timeLeft).forEach((interval) => {
            if (!timeLeft[interval as keyof typeof timeLeft]) {
                return;
            }
        });

    return (
        <Flex as='section' id='countdown' w='100%'>
            {timeLeft ?
                (<Flex className='timer' w={['80%', '80%', '50%', '50%', '30%']}>
                    <Text>{padWithZero(timeLeft.days)}D</Text>
                    <Text>{padWithZero(timeLeft.hours)}H</Text>
                    <Text>{padWithZero(timeLeft.minutes)}M</Text>
                    <Text>{padWithZero(timeLeft.seconds)}S</Text>
                </Flex>) :
                <Flex className='timer' justifyContent='center' w={['80%', '80%', '50%', '50%', '30%']}>
                    <Text fontWeight='bold'>RIFA FINALIZADA</Text>
                </Flex>
                }
        </Flex>
    );
};

export default CountdownTimer;
