import {GetStaticProps} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { usePlayer } from '../contexts/PlayerContext'

import {format, parseISO} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

import styles from './home.module.sass'

type Episode = {
    id: string,
    title: string,
    thumbnail: string,
    members: string,
    duration: number,
    durationAsString: string,
    url: string,
    publishedAt: string
}

type HomeProps = {
    lastedEpisodes: Episode[],
    allEpisodes: Episode[]
}

export default function Home ({lastedEpisodes, allEpisodes}: HomeProps) {

    const {playList} = usePlayer()

    const episodeList = [...lastedEpisodes, ...allEpisodes]

    return (
        <div className={styles.homepage}>

            <Head>
                <meta property="og:locale" content="pt_BR"/>

                <meta property="og:url" content="https://nlw5.vercel.app/"/>

                <meta property="og:title" content="Podcastr | O melhor para você ouvir, sempre"/>
                <meta property="og:site_name" content="Podcastr"/>

                <meta property="og:image" content="./banner.png"/>
                <meta property="og:image:type" content="image/svg"/>
                <meta property="og:image:width" content="1280"/>
                <meta property="og:image:height" content="720"/>

                <title>Home | Podcastr</title>
            </Head>

            <section className={styles.latestEpisodes}>
                <h2>Últimos lançamentos</h2>

                <ul>
                    {lastedEpisodes.map((episode, index) => {
                        return (
                            <li className={styles.lestedEpisode} key={episode.id}>

                                <div className={styles.lastedThumbnail}>
                                    <Image
                                        width={1200}
                                        height={1200}
                                        src={episode.thumbnail}
                                        alt={episode.title}
                                        objectFit="cover"
                                    />
                                </div>

                                <div className={styles.episodeDetails}>
                                    <Link href={`/episodes/${episode.id}`}>
                                        <a>{episode.title}</a>
                                    </Link>
                                    <p>{episode.members}</p>
                                    <span>{episode.publishedAt}</span>
                                    <span>{episode.durationAsString}</span>
                                </div>

                                <button type="button" onClick={() => playList(episodeList, index)}>
                                    <img src="/play-green.svg" alt="Tocar episódio"/>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section className={styles.allEpisodes}>
                <h2>Todos episódios</h2>

                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Podcast</th>
                            <th>Integrantes</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {allEpisodes.map((episode, index) => {
                            return (
                                <tr key={episode.id}>
                                    <td className={styles.thumbnail} style={{width: 72}}>
                                        <Image
                                            width={120}
                                            height={120}
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            objectFit="cover"
                                        />
                                    </td>
                                    <td className={styles.title}>
                                        <Link href={`/episodes/${episode.id}`}>
                                            <a>{episode.title}</a>
                                        </Link>
                                    </td>
                                    <td className={styles.members}>{episode.members}</td>
                                    <td className={styles.date} style={{width: 100}}>{episode.publishedAt}</td>
                                    <td className={styles.duration}>{episode.durationAsString}</td>
                                    <td className={styles.play}>
                                        <button type="button" onClick={() => playList(episodeList, index + lastedEpisodes.length)}>
                                            <img src="/play-green.svg" className={styles.playButton} alt="Tocar episódio"/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const {data} = await api.get('episodes', {
        params: {
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    const episodes = data.map((episode) => {
        return {
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            members: episode.members,
            publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
            duration: Number(episode.file.duration),
            durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
            url: episode.file.url
        }
    })

    const lastedEpisodes = episodes.slice(0,2)
    const allEpisodes = episodes.slice(2, episodes.lenght)

    return {
        props: {
            lastedEpisodes,
            allEpisodes
        },
        revalidate: 60 * 60 * 8,
    }
}