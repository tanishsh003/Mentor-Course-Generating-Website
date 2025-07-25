import React,{useState} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Sparkle } from 'lucide-react'
import { useRouter } from 'next/navigation';
// import { log } from 'console'
const AddNewCourseDialog = ({children}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = React.useState({
    name:'',
    description:'',
    noOfChapters:0,
    includeVideo:false,
    level:'',
    catagory:''

  })

  const router=useRouter();

  

  const onHandleInputChange=(field,value)=>{
    setFormData((prev)=>(
      {
        ...prev, [field]:value
      }
    ))
    console.log(formData);
    
  }

  const onGenerate=async ()=>{
    console.log(formData);
    const courseId=uuidv4()
    
    try{
      setLoading(true);
    const result=await axios.post('/api/generate-course-layout',{
      ...formData,
      courseId:courseId
    })
    console.log(result.data);
    
    setLoading(false)
    router.push('/workspace/edit-course')
    }
    catch(e){
      setLoading(false);
      console.log(e);
      
    }


  // try {
  //   console.log(formData);
  //   const result = await axios.post('/api/generate-course-layout/', formData);
  //   console.log(result.data);
  // } catch (error) {
  //   console.error("Error generating course layout:", error);
  // } finally {
  //   setLoading(false); // always run this
  // }

    

  }
  return (
    <div>
      <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Course using AI</DialogTitle>
      <DialogDescription asChild>
        <div className='flex flex-col gap-4 mt-3 text-xl text-gray-300'>
          <div>
            <label>Course Name</label>
            <Input onChange={(event)=>onHandleInputChange('name', event.target.value)} placeholder='Course Name' />
          </div>

          <div>
            <label>Course Discription</label>
            <Textarea onChange={(event)=>onHandleInputChange('description', event.target.value)} placeholder='Course Discription' />
          </div>

          <div>
            <label>No. of Chapters</label>
            <Input onChange={(event)=>onHandleInputChange('noOfChapters', event.target.value)} placeholder='Number of Chapters' type='number' />
          </div>
          <div className='flex gap-3 items-center'>
            <label  >Include Video</label>
            <Switch onCheckedChange={()=>onHandleInputChange('includeVideo', !formData?.includeVideo)} />
          </div>

          <div>
            <label  htmlFor="">Difficulty Level</label>
                      <Select onValueChange={(value)=>onHandleInputChange('level', value)} className='mt-4'>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Difficulty Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
            


          </div>

          <div>
            <label>Catagory</label>
            <Input  onChange={(event)=>onHandleInputChange('catagory', event.target.value)} placeholder='Catagory (saperated by comma)' />
          </div>
          <div className='mt-5'>
            <Button onClick={onGenerate} className={'w-full'} disabled={loading}> {loading ? <Loader2Icon className='animate-spin'/> :  <Sparkle/>} Generate course </Button>
          </div>

        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
      
    </div>
  )
}

export default AddNewCourseDialog
