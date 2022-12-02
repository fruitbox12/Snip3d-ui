import { useStorageUpload } from "@thirdweb-dev/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload() {
    const { mutateAsync: upload } = useStorageUpload();
    const [ipfsUrl, setIpfsUrl] = useState<string | null>()
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const uris = await upload({ data: acceptedFiles, options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true } });
            console.log(uris);
            uris?.[0] && setIpfsUrl(uris?.[0] as string)
        },
        [upload],
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
            <section
                className="
                container h-[100px] w-[500px] flex-[1] flex flex-col justify-center 
                items-center border-2 rounded-sm border-dashed	border-[#eeeeee] 
                text-[#bdbdbd] bg-[#fafafa] outline-none mx-auto my-0 mt-[40px] cursor-pointer"
            >
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </section>
            {
                ipfsUrl &&
                <div className='h-[300px] w-[300px] p-[20px]'>
                    <img alt={'IPFS'} src={ipfsUrl} className='h-full w-full object-contain' />
                </div>
            }
        </>
    )
}