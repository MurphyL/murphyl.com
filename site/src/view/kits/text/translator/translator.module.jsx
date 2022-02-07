import { useMemo, useState } from "react";

import stripFinalNewline from 'strip-final-newline';

const raw = `
어쩜 이렇게 하늘은 더 파란건지
오늘따라 왜 바람은 또 완벽한지
그냥 모르는척 하나 못들은척
지워버린척 딴 얘길 시작할까
아무 말 못하게 입맞출까
눈물이 차올라서 고갤 들어
흐르지 못하게 또 살짝 웃어
내게 왜 이러는지 무슨 말을 하는지
오늘 했던 모든 말 저 하늘 위로
한번도 못했던 말
울면서 할 줄은 나 몰랐던 말
나는요 오빠가 좋은걸 어떡해
새로 바뀐 내 머리가 별로였는지
입고 나왔던 옷이 실수였던건지
아직 모르는척 기억 안 나는척
아무 일없던것처럼 굴어볼까
그냥 나가자고 얘기할까
눈물이 차올라서 고갤 들어
흐르지 못하게 또 살짝 웃어
내게 왜 이러는지 무슨 말을 하는지
오늘 했던 모든 말 저 하늘 위로
한번도 못했던 말
울면서 할 줄은 나 몰랐던 말
나는요 오빠가 좋은걸
（휴~ 어떡해）
이런 나를 보고 그런 슬픈 말은 하지 말아요
철 없는 건지 조금 둔한건지 믿을 수가 없는걸요
눈물은 나오는데 활짝 웃어
네 앞을 막고서 막 크게 웃어
내가 왜 이러는지 부끄럼도 없는지
자존심은 곱게 접어 하늘 위로 오
한 번도 못했던 말 어쩌면 다신 못할 바로 그 말
나는요 오빠가 좋은걸（아이쿠, 하나 둘）
Im in my dream
（Its too beautiful beautiful day）
（Make it a good day）
（Just dont make me cry）
이렇게 좋은 날
`;


const Line = ({ text }) => {
    return (
        <div></div>
    );
};

export default function Translator() {
    const [ text, setText ] = useState(raw);
    const lines = useMemo(() => stripFinalNewline(text).split('\n'), [ text ]);
    return (
        <div>
            {lines.map((line, index) => (
                <div key={index} data-line-no={index + 1}>
                    <div>{line}</div>
                    <div contentEditable={true}>{line}</div>
                </div>
            ))}
        </div>
    );
};