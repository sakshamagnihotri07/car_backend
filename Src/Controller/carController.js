import Car from "../model/carModel.js";

export async function Carspecs(req, res) {
    const {CarName,Category,Year,Engine,Transmission,Fueltype,Price,Image,Description}= req.body
    
    try{
         const check = await Car.findOne({CarName})
        console.log(check);
        if(check){
            return res.status(400).send('Car Available')
        } 
        const option = new Car({
            CarName:CarName,
            Category,
            Year:parseFloat(Year),
            Engine,
            Transmission:Transmission || "manual",
            Fueltype,
            Price:parseFloat(Price),
            Image: Image || 'https://via.placeholder.com/300x200?text=Car',
            Description: Description || ''
        })
        await option.save()
    return res.status(201).send(option)
    }
    catch (error){
    console.log(error);
    return res.status(500).send("Car Unavailable")
    }
}

export async function getAllCars(req, res) {
    try {
        const cars = await Car.find();
        return res.status(200).send(cars);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error fetching cars");
    }
}

export async function getCarById(req, res) {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).send("Car not found");
        }
        return res.status(200).send(car);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error fetching car");
    }
}

export async function updateCar(req, res) {
    try {
        const { id } = req.params;
        const { CarName, Category, Year, Engine, Transmission, Fueltype, Price, Image, Description } = req.body;
        
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            {
                CarName,
                Category,
                Year: parseFloat(Year),
                Engine,
                Transmission,
                Fueltype,
                Price: parseFloat(Price),
                Image,
                Description
            },
            { new: true }
        );
        
        if (!updatedCar) {
            return res.status(404).send("Car not found");
        }
        
        return res.status(200).send(updatedCar);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error updating car");
    }
}

export async function deleteCar(req, res) {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        
        if (!deletedCar) {
            return res.status(404).send("Car not found");
        }
        
        return res.status(200).send("Car deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error deleting car");
    }
}