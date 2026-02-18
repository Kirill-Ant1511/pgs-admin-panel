'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { ModalBackground } from "@/components/ui/modal-background"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { usePlot } from "@/store/plot.state"
import { useTypeWork } from "@/store/type-work.state"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

interface Input {
  plotId: number
  typeWorkId: number
}

export function CreatePlanForm() {
  const router = useRouter()
  const { plots, getPlots } = usePlot()
  const { typeWorks, getAllTypeWorks } = useTypeWork()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      plotId: undefined as unknown as number,
      typeWorkId: undefined as unknown as number
    }
  })

  const closeModal = () => {
    router.back()
  }

  useEffect(() => {
    getPlots()
    getAllTypeWorks()
  }, [])

  const onSubmit = (data: Input) => {
    console.log(data)
  }

  return (
    <ModalBackground>
      <div className='flex w-full justify-between items-center'>
        <h1>Создание плана</h1>
        <Button onClick={closeModal}>
          <X size={22} />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <FieldLabel>Участок</FieldLabel>
          <Controller
            name="plotId"
            control={control}
            rules={{ required: 'Выберите участок' }}
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                value={value?.toString()} // ← Select принимает string, поэтому конвертируем
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите участок" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Участки</SelectLabel>
                    {plots.map((plot) => (
                      <SelectItem key={plot.id} value={plot.id.toString()}>
                        {plot.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            name="typeWorkId"
            control={control}
            rules={{ required: 'Выберите вид работ' }}
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                value={value?.toString()} // ← Select принимает string, поэтому конвертируем
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите вид работ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Участки</SelectLabel>
                    {typeWorks.map((typeWork) => (
                      <SelectItem key={typeWork.id} value={typeWork.id.toString()}>
                        {typeWork.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.plotId && (
            <p className="text-red-500 text-sm mt-1">{errors.plotId.message}</p>
          )}
        </Field>

        <Button type="submit" className="mt-4">
          Создать
        </Button>
      </form>
    </ModalBackground>
  )
}