export function Heading({headingLabel , subHeadingLabel}){
    return(
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl font-bold my-2">{headingLabel}</div>
          <div className="text-gray-600 text-xl my-2">
            {subHeadingLabel}
          </div>
        </div>
    )
}