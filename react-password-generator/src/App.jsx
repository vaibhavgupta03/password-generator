import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumbers] = useState(false);
  const [characterAllowed, setCharacters] = useState(false);
  const [password, setPassword] = useState("")
  
  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword]);
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordgenerator()
  }, [length, numberAllowed, characterAllowed, passwordgenerator])
  return (
    <>
      
      <div className='m-6 bg-gray-800 rounded-lg opacity-70 h-60 w-full p-5'>
        <h1 className='text-4xl text-center text-white font-semibold'>Password Generator</h1>
        <div className='flex justify-center p-5'>
        <input type='text' value={password} className='h-11 py-1 px-2 w-80 outline-none rounded-s-md' placeholder='Password' read-only ref={passwordRef}></input>
          <button type='submit' className=' bg-blue-600 text-white font-semibold text-xl h-11 w-30 rounded-e-md py-1 px-2 hover:bg-blue-900' onClick={copyPasswordToClipboard}>Copy</button></div>
        <div className='flex justify-center gap-x-8'>
        <div className='flex items-center gap-x-2'>
          <input type='range' min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer'/>
          <label className='text-md text-orange-500 font-semibold'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2 m-5 p-4'>
            <input type='checkbox' defaultChecked={numberAllowed} id="numberinput" onChange={() => {setNumbers((prev) => !(prev)) }} className='form-checkbox rounded text-blue-400 cursor-pointer'/>
            <label className='text-md text-orange-500 font-semibold'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type='checkbox' defaultChecked={characterAllowed} id="charinput" onChange={() => { setCharacters((prev) => !(prev)) }} className='form-checkbox rounded text-blue-400 cursor-pointer'/>
            <label className='text-md text-orange-500 font-semibold'>Characters</label>
          </div>
          </div>
        </div>
    </>
  )
}

export default App
