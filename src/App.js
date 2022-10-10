import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components'
import ReactPlayer from 'react-player/lazy';

import logoImg from './imgs/logo.svg'
import repeatImg from './imgs/repeat.svg'
import repeatOffImg from './imgs/repeatOff.svg'
// import listImg from './imgs/list.svg'
import listEditImg from './imgs/listEdit.svg'
import playImg from './imgs/play.svg'

import saveImg from './imgs/save.svg'
import upImg from './imgs/up.svg'
import downImg from './imgs/down.svg'
import deleteImg from './imgs/delete.svg'
import editImg from './imgs/edit.svg'

// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'
// import logoImg from './imgs/logo.svg'

//////////
// Themes
const themes = [
  {white: '#bbb', gray: '#444', black: '#222'}
]
const theme = themes[0]

//////////
// DIV Flex
const Flex = styled.div`
  grid-area: ${(props) => props.gridArea};
  display: flex;
  align-itemts: center;
`
const FlexCenter = styled(Flex)`
  justify-content: center;
  text-align: center;
`
const FlexRight = styled(Flex)`
  justify-content: flex-end;
`
const FlexColumn = styled.div`
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const DivFont08 = styled.div`
  font-size: 0.8rem;
`

// IMG BUTTON
const DivImage = styled.div`
  margin-top: 3px;
`
const Image20 = styled.img`
  width: 20px;
  height: 20px;
`
const Image14 = styled.img`
  width: 14px;
  height: 14px;
`

//////////
// Container
const Container = styled.div`
  width: ${(props => props.width)}px;
  min-width: 390px;
  max-width: 960px;
`

const AppTitle = styled(Flex)`
  max-width: 100vw;
  margin: 10px 0;
  font-weight: 1000;
  color: ${theme.white};
`

const Footer = styled.div`
  margin-top: 20px;
  border-top: solid #555 1px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 100px;
  color: #777;
  font-size: 0.8rem;
`

// Player
const PlayerList = styled.div`
  margin: 10px 0 0 0;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: ${theme.gray};
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  // align-items: center;
  gap: 5px;
  font-size: 1.1rem;
  font-weight: 600;
`

const Player = styled.div`
  // width: ${(props => props.width)}px;
  // height: ${(props => props.width / 2)}px;
`

const PlayerInfo = styled.div`
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: ${theme.gray};
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 5px;
`

const AuthorInfo = styled.div`
  padding-right: 5px;
  align-self: flex-end;
  text-align: right;
  font-size: 0.7rem;
  transform: skew(170deg);
`

const PlayerThumbnail = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  & div {
    filter: grayscale(1);
  }
  & div:nth-child(${props => props.playNumber + 1}) {
    filter: grayscale(0);
  }
`

// Edit
const Edit = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(390px, 1fr));
  gap: 10px;
`

const EditBlock = styled.div`
  background-color: ${theme.gray};
  border-radius: 5px;
  padding: 10px;
`

//// Add Item

//// Edit List
const EditListTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
`
const EditListOne = styled.div`
  margin-top: 4px;
  border-top: solid #777 1px;
  padding-top: 6px;
  display: grid;
  grid-template-columns: 20px 1fr 3fr 20px;
  gap: 5px;
`



const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

const ImageTest = styled.img.attrs({
  src: `${logoImg}`,
})`
  width: 20px;
  height: 20px;
`

function App() {
  const [repeat, setRepeat] = useState(false)
  const listBox = [
    {idx: 0, title: 'Jace\'s Pick', description: '딩고 뮤직 킬링보이스 & ...', username: 'jace'},
  ]
  const playListTemplate = [
    // {title: 'YENA (최예나) - SMILEY (Feat. BIBI) MV', author: 'Stone Music Entertainment', provider: 'YouTube', url: 'https://youtu.be/y9kkXTucnLU' , thumbnail: 'https://i.ytimg.com/vi/y9kkXTucnLU/hqdefault.jpg'},
    {title: '멜로망스(MeloMance)의 킬링보이스를 라이브로! - 인사, 동화, 입맞춤, You, 고백, 질투가좋아, 부끄럼, 선물, 짙어져, 좋은날, 욕심, 사랑인가봐, 축제, 초대', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/hn4XiirKdNE', thumbnail: 'https://i.ytimg.com/vi/hn4XiirKdNE/hqdefault.jpg'},
    {title: '치즈(CHEEZE)의 킬링보이스를 라이브로!- Madeleine Love, 어떻게 생각해, Mood Indigo, 빈칸에게, 퐁당, Perhaps Love, 좋아해 | 딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/fyDz91HDt4g', thumbnail: 'https://i.ytimg.com/vi/fyDz91HDt4g/hqdefault.jpg'},
    {title: '태연(TAEYEON)의 킬링보이스를 라이브로! - I,그대라는 시,만약에,11:11,Blue,Time Lapse,Weekend,불티,사계,Gravity,INVU,너를 그리는 시간', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/5ch94AaPZRQ', thumbnail: 'https://i.ytimg.com/vi/5ch94AaPZRQ/hqdefault.jpg'},
    {title: '나윤권(Na Yoon Kwon)의 킬링보이스를 라이브로!-나였으면,기대,동감,애창곡,바람이좋은날,약한남자,뒷모습,멍청이,오늘이지나면,헤어져보자ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4w3p3ef2ydQ', thumbnail: 'https://i.ytimg.com/vi/4w3p3ef2ydQ/hqdefault.jpg'},
    {title: '벤(BEN)의 킬링보이스를 라이브로! - 열애중,오늘은가지마,꿈처럼,갈수가없어,눈사람,헤어져줘서고마워,빈방, LoobyLoo,내목소리들리니,180도,혼술하고싶은밤,지금뭐해ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4bwRyeT1afM', thumbnail: 'https://i.ytimg.com/vi/4bwRyeT1afM/hqdefault.jpg'},
    {title: '권진아 (KwonJinAh)의 킬링보이스를 라이브로! - 끝, Lonely Night, Fly Away, 씨스루,여기까지,KNOCK, 위로,운이좋았지,뭔가잘못됐어, 여행가ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/5ePKBm4spBg', thumbnail: 'https://i.ytimg.com/vi/5ePKBm4spBg/hqdefault.jpg'},
  ]
  const [playList, setPlayList] = useState(
    window.localStorage.getItem('liston') !== null
    ? JSON.parse(window.localStorage.getItem('liston'))
    : playListTemplate
  )
  const [playNumber, setPlayNumber] = useState(0)


  // Window Size
  const [windowSize, setWindowSize] = useState({x: 960, y: 960})
  const changeSizeTotal = () => {
    const x960 = document.documentElement.clientWidth < 960 ? document.documentElement.clientWidth : 960
    setWindowSize({
      x: x960,
      y: window.innerHeight,
      xPlay: x960,
      yPlay: parseInt(x960 / 2),
      xHalf: parseInt(x960 / 2),
    })
  }
  useEffect(() => {
    changeSizeTotal()
    window.addEventListener('resize', changeSizeTotal);
    window.addEventListener('orientationchange', changeSizeTotal);
  }, [])


  return (
    <Container width={windowSize.x}>
      
      <AppTitle width={windowSize.x}>
        <Image20 src={logoImg}></Image20>
        &nbsp;ListOn
      </AppTitle>

      <PlayerList width={windowSize.x}>
        <DivImage onClick={() => setRepeat(prev => !prev)}><Image20 src={repeat ? repeatImg : repeatOffImg}></Image20></DivImage>
        <Flex>{listBox[0].title}</Flex>
        <DivImage><Image20 src={listEditImg}></Image20></DivImage>
      </PlayerList>
      <Player>
        <ReactPlayer
          url={playList[playNumber].url}
          onEnded={() => {
            if (playNumber + 1 !== playList.length) {
              setPlayNumber(prev => prev + 1)
            } else if (repeat) {
              setPlayNumber(0)
            }
          }}
          playing={true}
          controls="true"
          width={windowSize.xPlay} height={windowSize.yPlay}></ReactPlayer>
      </Player>
      <PlayerInfo width={windowSize.x}>
        <DivImage><Image20 src={playImg}></Image20></DivImage>
        <div>
          <div>{playList[playNumber].title}</div>
          <AuthorInfo>{playList[playNumber].author}</AuthorInfo>
        </div>
      </PlayerInfo>
      <PlayerThumbnail playNumber={playNumber}>
        {playList.map(({title, author, provider, url, thumbnail}, index) => (
          <div>
            <img src={thumbnail} title={title} onClick={() => setPlayNumber(index)} width="auto" height="64px" />
          </div>
        ))}
      </PlayerThumbnail>

      <Edit>
        <EditBlock>
          ADD
        </EditBlock>
        <EditBlock>

          <EditListTitle>
            <div>LIST</div>
            <div>
              <Image20 src={saveImg}
                onClick={() => {window.localStorage.setItem('liston', JSON.stringify(playList));}} />
            </div>
          </EditListTitle>
          { playList.map(({title, author, provider, url, thumbnail}, index) => (
            <EditListOne>
              <FlexColumn>
                <div>
                  <Image14 src={upImg}
                    onClick={() => {
                      if (index !== 0) {
                        const temp = playList[index - 1];
                        playList[index - 1] = playList[index];
                        playList[index] = temp;
                        setPlayList(playList.slice())
                      }
                    }} />
                </div>
                <div>                  
                  <Image14 src={downImg}
                    onClick={() => {
                      console.log(index, playList.length)
                      if (index !== playList.length - 1) {
                        const temp = playList[index + 1];
                        playList[index + 1] = playList[index];
                        playList[index] = temp;
                        setPlayList(playList.slice())
                      }
                    }} />
                </div>
              </FlexColumn>
              <div className="play-list-one-image"><img src={thumbnail} width="100%" height="auto" /></div>
              <FlexColumn>
                <DivFont08>{title}</DivFont08>
                <AuthorInfo>[ {author} ]</AuthorInfo>
              </FlexColumn>
              <FlexColumn>
                <div>
                  <Image14 src={deleteImg}
                    onClick={() => {
                      playList.splice(index, 1)
                      setPlayList(playList.slice())
                    }} />
                </div>
                <div>                  
                  <Image14 src={editImg}
                    onClick={async () => {
                      // setInputUrl(url)
                      // setCheckUrl(url)
                      // await getUrlInfo(url)
                      // setPlayListEditIndex(index)
                      // inputUrlInfo.title = title
                      // inputUrlInfo.author_name = author
                      // inputUrlInfo.provider_name = provider
                      // inputUrlInfo.url = url
                      // inputUrlInfo.thumbnail_url = thumbnail
                      // setInputUrlInfo(JSON.parse(JSON.stringify(inputUrlInfo)))
                    }} />
                </div>
              </FlexColumn>
            </EditListOne>
          ))}

        </EditBlock>
      </Edit>

      <div className="edit">

      </div>

      <div>
        <input type="text"></input>
      </div>

      <Footer width={windowSize.x}>
        <Flex>
          Fully Supported Media: YouTube, Facebook, SoundClound, Vimeo<br />
          Supported Media: Treamable, Vidme, Wistia, Twitch, DailyMotion, Vidyard
        </Flex>
        <FlexRight>Copyright. Jace</FlexRight>
      </Footer>

      <Button>Normal Button</Button>
      <Button primary>Primary Button</Button>
      <ImageTest></ImageTest>
      <Image20 src="https://i.ytimg.com/vi/hn4XiirKdNE/hqdefault.jpg" />
    </Container>
  )
}

export default App;
