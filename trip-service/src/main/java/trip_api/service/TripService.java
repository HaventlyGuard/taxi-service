
package trip_api.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import trip_api.client.UserClient;
import trip_api.dto.*;
        import trip_api.entity.Rates;
import trip_api.entity.Trip;
import trip_api.entity.TripStatus;
import trip_api.repository.TripRepository;
import user_api.dto.DriverResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TripService {

    private final TripRepository repository;
    private final UserClient userClient;
    private final FreeDistanceService freeDistanceService;

    @Transactional()
    public Trip create(CreateTripRequest request) {
        log.info("Creating trip for passenger: {}", request.getPassengerId());

        userClient.checkPassenger(request.getPassengerId());

        DriverResponse driver = getDriver();
        log.info("Assigned driver: {}", driver.getId());

        PriceResult result = calculatePrice(
                request.getRate(),
                request.getOrigin(),
                request.getDestination()
        );

        Trip trip = Trip.builder()
                .passengerId(request.getPassengerId())
                .driverId(driver.getId())
                .status(TripStatus.CREATED)
                .origin(request.getOrigin())
                .destination(request.getDestination())
                .rate(request.getRate())
                .price(result.price())
                .distanceKm(result.distanceKm())
                .durationMin(result.durationMin())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Trip savedTrip = repository.save(trip);
        log.info("Trip saved with ID: {}", savedTrip.getId());

        return savedTrip;
    }

    public List<Trip> getAll(){
        return repository.findAll();
    }

    public Trip get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
    }

    public List<Trip> getByPassenger(Long passengerId) {
        return repository.findByPassengerId(passengerId);
    }

    @Transactional
    public Trip updateStatus(Long id, TripStatus status) {
        Trip trip = get(id);
        trip.setStatus(status);
        trip.setUpdatedAt(LocalDateTime.now());
        return repository.save(trip);
    }

    private PriceResult calculatePrice(Rates rate, String origin, String destination) {
        try {
            var dist = freeDistanceService.getDistance(origin, destination);
            double km = Math.max(dist.getDistanceKm(), 1.0);

            log.info("Distance: {}km, {}min ({} -> {})",
                    String.format("%.1f", km),
                    String.format("%.0f", dist.getDurationMin()),
                    origin, destination
            );

            double basePrice = switch (rate) {
                case ECONOMY -> 20.0;
                case COMFORT -> 35.0;
                case BUSINESS -> 55.0;
            };

            double price = basePrice * km;
            return new PriceResult(
                    Math.round(price * 100) / 100.0,
                    km,
                    dist.getDurationMin()
            );
        } catch (Exception e) {
            log.warn("Distance calc failed, fallback");
            return new PriceResult(350.0, 10.0, 15.0);
        }
    }

    private DriverResponse getDriver() {
        return userClient.assignDriver();
    }

    public TripStatsResponse getDailyStats(LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);

        List<Trip> trips = repository.findTripsByDay(start, end);
        long count = trips.size();

        double avgPrice = trips.stream()
                .mapToDouble(Trip::getPrice)
                .average()
                .orElse(0.0);

        return new TripStatsResponse(count, Math.round(avgPrice * 100.0) / 100.0);
    }

    @Transactional
    public Trip rateTrip(Long tripId, RateTripRequest request) {
        Trip trip = get(tripId);

        if (trip.getStatus() != TripStatus.COMPLETED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Trip must be completed before rating"
            );
        }

        if (trip.getRating() != null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Trip already rated"
            );
        }

        trip.setRating(request.getRating());
        trip.setUpdatedAt(LocalDateTime.now());

        return repository.save(trip);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}
