export default function babelFilter(skipBabel: {
    package: string;
    semverRange?: string;
}[]): (filename: string) => boolean;
