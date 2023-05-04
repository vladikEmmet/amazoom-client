import Head from "next/head";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

interface ISeo {
    title: string;
    description?: string;
    image?: string;
}

export const titleMerge = (title: string) => `${title} - Amazoom`

const Meta: FC<PropsWithChildren<ISeo>> = ({
    title,
    description = "Amazoom - online-shop",
    image,
    children
}) => {
    const {asPath} = useRouter();
    const url = `${process.env.APP_URL}${asPath}`;

    return (
        <>
            <Head>
                <title itemProp="headline">{titleMerge(title)}</title>
                <meta name="description" itemProp="description" content={description} />
                <link rel="canonical" href={url}/>
                <meta property="og:locale" content="en"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={titleMerge(title)}/>
                <meta property="og:image" content={image}/>
                <meta property="og:description" content={description}/>
            </Head>
            {children}
        </>
    )
}

export default Meta;