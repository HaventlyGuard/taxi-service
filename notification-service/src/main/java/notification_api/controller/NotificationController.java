
        package notification_api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import notification_api.entity.NotificationTask;
import notification_api.entity.TaskStatus;
import notification_api.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

        import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Tag(name = "Notification", description = "Управление уведомлениями")
public class NotificationController {

    private final NotificationRepository repository;

    @PostMapping
    @Operation(summary = "Создать задачу уведомления")
    public NotificationTask create(@RequestBody NotificationTask task) {
        task.setStatus(TaskStatus.PENDING);
        task.setAttempts(0);
        task.setCreatedAt(LocalDateTime.now());
        return repository.save(task);
    }

    @GetMapping("/{tripId}")
    @Operation(summary = "Получить уведомления по поездке")
    public List<NotificationTask> getByTrip(@PathVariable Long tripId) {
        return repository.findByTripId(tripId);
    }

    @GetMapping("/health")
    @Operation(summary = "Health check")
    public Map<String, String> health() {
        return Map.of("status", "OK", "service", "notification-service");
    }
}
